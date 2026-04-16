import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const OrderHistoryBox = ({ item, installmentCheckout, payingId }) => {

    const[expandedId, setExpandedId] = useState(null);

    const formatPrice =(price) => {
        return price.toLocaleString('en-IN');
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-IN',{
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const toggelInstallments = (id) => {
        setExpandedId(expandedId === id? null : id);
    };

    return(
        <View style={styles.container}>
            <View style={styles.Row}>
                <View>
                    <Text style={styles.orderIdTxt}>ORDER: {item.merchantOrderId}</Text>
                    <Text>Placed On: {formatDate(item.createdAt)}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16}}>Status: </Text>
                    <View style={styles.orderStatus}>
                        <Text style={styles.orderStatusTxt}>{ item.orderStatus }</Text>
                    </View>
                </View>
            </View>

            <View style={styles.line}/>

            <View style= {styles.Row}>
                <Text>Items</Text>
                <Text>Qty: {item.ordertemList.length}</Text>
            </View>

            <View style= {styles.Row}>
                <Text>Amount:  {formatPrice(item.totalAmount)}</Text>
                <Text>Paid: {item.paidAmount || 0 }</Text>
            </View>

            <View style={styles.Row}>
                <Text>Installment:  {formatPrice(item.installmentAmount)}</Text>
                <TouchableOpacity style={styles.Row} onPress={() => toggelInstallments(item.id)}>
                    <Text style={styles.viewInstallmentBox}>View all {expandedId === item.id ? "▲" : "▼"}</Text>
                </TouchableOpacity>
            </View>

            {expandedId === item.id && (
                <View style={styles.installmentBox}>
                    <View style={styles.installmentHeader}>
                        <Text style={{fontWeight: 'bold'}}>S.N.</Text>
                        <Text style={{fontWeight: 'bold'}}>Due Date</Text>
                        <Text style={{fontWeight: 'bold'}}>Amount</Text>
                    </View>
                    <View style={styles.line}/>
                    { item.installmentsList?.map( (ins, index) => (
                        <View  key={ins.id.toString()} style={styles.installmentRow}>
                            <Text>{index+1}</Text>
                            <Text>{formatDate(ins.dueDate)} </Text>
                            <TouchableOpacity 
                                style={[
                                    styles.payBtn, 
                                    {
                                        backgroundColor: ins.unlocked 
                                        ? (ins.installmentStatus === 'PENDING' ? 'royalblue' : 'green')
                                        : 'gray'
                                    }
                                ]}
                                disabled= {!ins.unlocked}
                                onPress={()=> installmentCheckout(item.id, ins.installmentAmount, ins.id)}>
                                { payingId === ins.id 
                                    ? <ActivityIndicator color='white'/> 
                                    : <Text style={{color: '#fff', fontWeight: 'bold'}}>{ins.unlocked ? 'Pay Now' : ins.installmentStatus}</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        width: '95%',
        padding: 12,
        borderRadius: 12,
        marginTop: 15,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },

    Row:{
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    orderIdTxt:{
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },

    orderStatus:{
        padding: 5,
        borderRadius: 8,
        backgroundColor: '#d4edda',
    },

    orderStatusTxt:{
        fontSize: 12,
        fontWeight: '900',
        color: '#155724',
    },

    line:{
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 5,
    },

    installmentBox:{
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },

    installmentRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },

    installmentHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },

    viewInstallmentBox:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        color: 'blue'
    },

    payBtn:{
        padding: 8,
        borderRadius: 5,
    },

});

export default OrderHistoryBox;