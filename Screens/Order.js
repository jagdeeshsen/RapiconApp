import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from "react-native"
import OrderHistoryBox from "../Components/OrderHistoryBox";
import { checkToken, getAuthData } from "../utils/authStorage";
import { orderService } from "../Service/orderService";
import ErrorMessage from "../Components/ErrorMessage";
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import { SafeAreaView } from "react-native-safe-area-context";

const MERCHANT_ID = 'M232LIX7SOZLM';
const ENVIRONMENT = 'PRODUCTION';
const APP_SCHEME = 'myapp://callback';

const Order= ({ setIsLoggedIn})=>{

    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const[payingId, setPayingId] = useState(null);
    

    useEffect( () => {
        const checkLogin= async () => {
            const auth = await checkToken();

            if(!auth){
                setIsLoggedIn(false);
            }
        };

        checkLogin();
    }, []);

    useEffect(() => {
        const init =async ()=> {
            try{
                const authData= await getAuthData();

                if(!authData?.userId){
                    setError('User Id not found. Please login to get order details.');
                    setLoading(false);
                    return ;
                }

                await fetchOrders(authData?.userId);
            }catch(error){
                setError(error.message || 'Failed to fetch order details');
            }finally{
                setLoading(false);
            }
        };
        
        init();

    }, []);

    const fetchOrders = async (userId) => {
        const response = await orderService.getOrderByUser(userId);
        setOrders(response);
    };

    if(loading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
            </View>
        )
    }

    if(error){
        return (
            <View>
                <Text style={{justifyContent: 'center', marginTop: 20, color: 'red'}}>{error}</Text>
            </View>
        )
    }

    // ------------- PhonePe Payment flow ------------------------------//

    const handleInstallmentCheckout = async(orderId, amount, insId) => {
        setPayingId(insId);

        let installmentRequest = {
            merchantOrderId: `TXN_${orderId}_${Date.now()}`,
            amount: (amount*100), // convert amount in paisa
            orderId: orderId
        };

        await handleCheckout(installmentRequest);
    };


    const handleCheckout = async (installmentRequest) => {

        try{
            // init phonepe sdk
            await PhonePePaymentSDK.init(
                ENVIRONMENT, 
                MERCHANT_ID, 
                'cart-flow', 
                false
            ).then(result => {
                console.log("Message: SDK Initialisation ->" + JSON.stringify(result));
            }).catch(error => {
                console.log("error:" + error.message);
            });

            const paymentData = await orderService.initiatePhonePeSDK(installmentRequest.merchantOrderId, installmentRequest.amount);
            
            // build payload for phonePe sdk
            const payload = {
                orderId: paymentData.orderId,
                merchantId: MERCHANT_ID,
                token: paymentData.token,
                paymentMode: { type: 'PAY_PAGE'},
            };

            const response = await PhonePePaymentSDK.startTransaction(JSON.stringify(payload), APP_SCHEME);
            console.log(response);

            if (response.status === 'CONCLUDED') {
                await verifyOrderOnServer(installmentRequest.merchantOrderId, installmentRequest.orderId);
            } else if (response.status === 'FAILURE') {
                Alert.alert('Payment cancelled', 'You cancelled the payment.');
            } else {
                Alert.alert('Payment failed', response.error || 'Please try again.');
            }
        }catch(error){
            Alert.alert('Error', error.message || 'Something went wrong.');
        }finally{
            setPayingId(null);
        }
    };

    // check payment order status
    const verifyOrderOnServer = async (merchantOrderId, orderId) => {
        const response= await orderService.veriyOrderStatus(merchantOrderId);
        console.log(response);

        if(!response.ok){
            console.log('Failed to varify payment status.');
        }

        if(response.state === 'COMPLETED'){
            await completeOrder(merchantOrderId, orderId, response);
        }else if(response.state === 'FAILED'){
            Alert.alert('Payment Status:', 'Payment failed. Please try again.');
        }else if(response.state === 'PENDING'){
            Alert.alert('Payment is being processed.', 'We will notify you once completed');
        }
    };

    const completeOrder = async (merchantOrderId, orderId, responseData) => {
        try{
            const request = {
                orderId: orderId,
                merchantOrderId: merchantOrderId,
                phonePeOrderId: responseData.orderId,
                paymentState: responseData.state,
                amount: responseData.amount,
                paymentDetails: responseData.paymentDetails
            };


            const response = await orderService.completeInstallmentOrder(request);

            if(!response.ok){
                console.log('Failed to saved Payment details on server.');
            }

            Alert.alert('Payment status', 'Your installment payment successfully.');
        }catch(error){
            console.log('Failed to create Order', error.message);
        }
    };
    



    return (
	<>
	<StatusBar barStyle = 'light-content' />
	
        <SafeAreaView edges = {[ 'left', 'right' ]} style={{flex: 1, backgroundColor: '#F8F9FB'}}>
            <FlatList
                data={orders} 
                renderItem={ ({ item }) => <OrderHistoryBox item={item} installmentCheckout = {handleInstallmentCheckout} payingId={payingId}/>}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 8}}
                ListEmptyComponent={loading ? <ActivityIndicator size='large' style= {styles.activityIndicator}/> : <ErrorMessage textMessage='You have not placed any orders yet.'/>}>
            </FlatList>
        </SafeAreaView>
	</>
	
    );
};

const styles= StyleSheet.create({

    activityIndicator:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
})

export default Order;