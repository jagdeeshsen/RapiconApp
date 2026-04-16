import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native"
import CartItemBox from "../Components/CartItemBox";
import CartListHeader from "../Components/CartListHeader";
import CartListFooter from "../Components/CartListFooter";
import { useCallback, useEffect, useState } from "react";
import { checkToken, getAuthData } from "../utils/authStorage";
import { CartService } from "../Service/CartService";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import { orderService } from "../Service/orderService";
import ErrorMessage from "../Components/ErrorMessage";


const MERCHANT_ID = 'M232LIX7SOZLM';
const ENVIRONMENT = 'PRODUCTION';
const APP_SCHEME = 'myapp://callback';


const Cart=()=>{

    const[error, setError] = useState(null);
    const[cartItems, setCartItems] = useState([]);
    const[totalPrice, setTotalPrice] = useState(0);
    const[loading, setLoading] = useState(true);
    const[paying, setPaying] = useState(false);
    const[orderData, setOrderData] = useState({
        userId: '',
        totalAmount: '',
        cartList: [],
        totalInstallments: 1,
        installmentAmount: ''
    });

    // check token expired or not
    useEffect( () => {
        const checkLogin= async () => {
            const auth = await checkToken();

            if(!auth){
                setIsLoggedIn(false);
            }
        };

        checkLogin();
    }, []);

    // load cart items
    useFocusEffect(
        useCallback(()=>{
            const init = async() => {
                try{
                    const authData=  await getAuthData();

                    if(!authData?.userId){
                        setError('User id not found. Please login first');
                        setLoading(false);
                        return ;
                    }

                    setOrderData( prev => ({ ...prev, userId: authData?.userId}));
                    await fetchCartItems(authData?.userId);
                }catch(error){
                    setError(error.message || 'Failed to fetch cart items');
                }
            }

            init();
        }, [])
    )

    // calculate total price
    useEffect(()=>{
        let total=0;

        cartItems.forEach((item)=>{
            total+= item.totalAmount || 0;
        });

        // tax calculate
        let grantTotal = total+ (total*18)/100;

        setTotalPrice(total);
        setOrderData(prev => ({...prev, totalAmount: grantTotal, installmentAmount: grantTotal/prev.totalInstallments}));
    }, [cartItems]);


    const fetchCartItems = async (userId) => {
        try{
            const apiCartItems = await CartService.getAllCartItems(userId);
            setCartItems(apiCartItems);
            setOrderData( prev => ({ ...prev, cartList: apiCartItems}));

        }catch(error){
            console.log(error.message || 'Failed to fetch cart data');
        }
    };

    const handleOnDelete = async (id) => {
        try{
            await CartService.deleteCartItem(id);
            setCartItems(prev => prev.filter(item => item.id !== id));
        }catch(e){
            console.log('Failed to delete cart item');
        }
    }


    // ------------- PhonePe Payment flow ------------------------------//
    const handleFullCheckout = async() => {
        await handleCheckout(orderData);
    };

    const handleInstallmentCheckout = async() => {
        let orderRequest = {
            userId: orderData.userId,
            totalAmount: orderData.totalAmount,
            cartList: orderData.cartList,
            totalInstallments: 10,
            installmentAmount: orderData.totalAmount/10
        };

        await handleCheckout(orderRequest);
    };


    const handleCheckout = async (orderRequest) => {

        if(cartItems.length === 0){
            Alert.alert('Cart is empty', 'Add items before checking out.');
            return ;
        }

        setPaying(true);

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

            // call api to create order
            const orderResponse = await orderService.createOrder(orderRequest);
            

            const paymentData = await orderService.initiatePhonePeSDK(orderResponse.merchantOrderId, orderResponse.amount);
            
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
                await verifyOrderOnServer(orderResponse.merchantOrderId, orderResponse.id);
                //Alert.alert('Payment successful', 'Your order has been placed!');
                //setCartItems([]);
            } else if (response.status === 'FAILURE') {
                Alert.alert('Payment cancelled', 'You cancelled the payment.');
            } else {
                Alert.alert('Payment failed', response.error || 'Please try again.');
            }
        }catch(error){
            Alert.alert('Error', error.message || 'Something went wrong.');
        }finally{
            setPaying(false);
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


            const response = await orderService.completeOrder(request);

            if(!response.ok){
                console.log('Failed to saved Payment details on server.');
            }

            Alert.alert('Payment successfully', 'Your order has been placed.');
        }catch(error){
            console.log('Failed to create Order', error.message);
        }
    };

    if(error){
        return (
            <View>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }


    return (
        <SafeAreaView>
            <FlatList
                data={cartItems}
                renderItem={({ item })=> <CartItemBox item={item} onDelete={()=>handleOnDelete(item.id)}/>}
                keyExtractor={(item)=> item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<CartListHeader/>}
                ListFooterComponent={<CartListFooter price={totalPrice} onCheckout= {handleFullCheckout} onInstallmentCheckout={handleInstallmentCheckout} paying={paying}/>}
                contentContainerStyle={{backgroundColor: '#f8f8f8'}}
                ListEmptyComponent={loading ? <ActivityIndicator size={24} color='#000'/>
                                            : <ErrorMessage textMessage='Your cart is empty'/>
                }
            />
        </SafeAreaView>
    )
};

const styles= StyleSheet.create({
    container:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    errorText:{
        color: 'red',
        fontSize: 16,
        marginTop: 20,
        alignItems: 'center',
    },
});

export default Cart;