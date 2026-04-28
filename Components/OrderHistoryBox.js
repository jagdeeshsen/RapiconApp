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
                    <Text style={styles.orderPlacedTxt}>Placed On: {formatDate(item.createdAt)}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 14, fontWeight: '400', color: '#6B7A99'}}>Status: </Text>
                    <View style={styles.orderStatus}>
                        <Text style={styles.orderStatusTxt}>{ item.orderStatus }</Text>
                    </View>
                </View>
            </View>

            <View style={styles.line}/>

            <View style= {styles.Row}>
                <Text style={styles.fieldLable}>Items</Text>
                <Text style={styles.fieldValue}>Qty: {item.ordertemList.length}</Text>
            </View>

            <View style= {styles.Row}>
                <Text style={styles.fieldLable}>Amount: ₹ {formatPrice(item.totalAmount)}</Text>
                <Text style={styles.fieldValue}>Paid: ₹ {item.paidAmount || 0 }</Text>
            </View>

            <View style={styles.Row}>
                <Text style={styles.fieldValue}>Installment: ₹ {formatPrice(item.installmentAmount)} /mo</Text>
                <TouchableOpacity style={styles.viewInstallmentBox} onPress={() => toggelInstallments(item.id)}>
                    <Text style={styles.viewInstallmentText}>View all {expandedId === item.id ? "▲" : "▼"}</Text>
                </TouchableOpacity>
            </View>

            {expandedId === item.id && (
                <View style={styles.installmentBox}>
                    <View style={styles.installmentHeader}>
                        <Text style={styles.installmentHeading}>S.N.</Text>
                        <Text style={styles.installmentHeading}>Due Date</Text>
                        <Text style={styles.installmentHeading}>Amount</Text>
                    </View>
                    <View style={styles.line}/>
                    { item.installmentsList?.map( (ins, index) => (
                        <View  key={ins.id.toString()} style={styles.installmentRow}>
                            <Text style={styles.fieldLable}>{index+1}</Text>
                            <Text style={styles.fieldValue}>{formatDate(ins.dueDate)} </Text>
                            <TouchableOpacity 
                                style={[
                                    styles.payBtn, 
                                    {
                                        backgroundColor: ins.unlocked 
                                        ? (ins.installmentStatus === 'PENDING' ? '#1A3A5C' : '#065F46')
                                        : '#FFFFFF'
                                    }
                                ]}
                                disabled= {!ins.unlocked}
                                onPress={()=> installmentCheckout(item.id, ins.installmentAmount, ins.id)}>
                                { payingId === ins.id 
                                    ? <ActivityIndicator color='white'/> 
                                    : <Text style={{color: ins.unlocked ? '#FFFFFF' : '#6B7A99', fontWeight: '600'}}>{ins.unlocked ? 'Pay Now' : ins.installmentStatus}</Text>
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
        width: '100%',
        padding: 10,
        borderRadius: 12,
        marginTop: 5,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },

    Row:{
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    orderIdTxt:{
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
        color: '1A2233',
    },

    orderStatus:{
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#D1FAE5',
    },

    orderStatusTxt:{
        fontSize: 12,
        fontWeight: '900',
        color: '#065F46',
    },

    orderPlacedTxt:{
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7A99',
    },

    line:{
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 5,
    },

    fieldLable:{
        fontSize: 14,
        fontWeight: '400',
        color: '#6B7A99',
    },

    fieldValue:{
        fontSize: 14,
        fontWeight: '500',
        color: '#1A2233',
    },

    installmentBox:{
        backgroundColor: '#F8F9FB',
        padding: 10,
        borderRadius: 10,
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

    installmentHeading:{
        fontSize: 14,
        fontWeight: '500',
        color: '1A2233',
    },

    viewInstallmentBox:{
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#E8F0FA'
    },

    viewInstallmentText:{
        fontSize: 14,
        fontWeight: '600',
        color: '#1A2233',
    },

    payBtn:{
        padding: 8,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },

});

export default OrderHistoryBox;