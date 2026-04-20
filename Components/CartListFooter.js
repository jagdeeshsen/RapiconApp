import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const CartListFooter=({ price, onCheckout, onInstallmentCheckout, paying })=>{

    let tax = (price*18)/100;
    let total= price + tax;

    const formatePrice=(price)=>{
        return price.toLocaleString('en-IN');
    };


    return (
        <View style={styles.container}>
            
            <View style={styles.orderSummary}>
                <Text style={styles.headingText}>Order Summary:</Text>

                <View style={styles.detailComponent}>
                    <Text style={styles.fieldLabel}>Subtotal:</Text>
                    <Text style={styles.fieldValue}> ₹ {formatePrice(price)}</Text>
                </View>

                <View style={styles.detailComponent}>
                    <Text style={styles.fieldLabel}>Tax (18%):</Text>
                    <Text style={styles.fieldValue}> ₹ {formatePrice(tax)}</Text>
                </View>

                <View style={styles.line}/>

                <View style={styles.detailComponent}>
                    <Text style={styles.fieldValue}>Total:</Text>
                    <Text style={styles.fieldValue}> ₹ {formatePrice(total)}</Text>
                </View>

                <View style={styles.detailComponent}>
                    <Text style={styles.fieldLabel}>Installment:</Text>
                    <Text style={styles.installmentPrice}> ₹ {formatePrice(total/10)} /mo</Text>
                </View>
                
            </View>
            
            <TouchableOpacity
                style={[styles.primaryBtn, paying && styles.customBtnDisabled]}
                onPress={onCheckout}
                disabled={paying}
                activeOpacity={0.8}
            >
                {paying
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.primaryBtnText}>Pay Now</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.secondaryBtn, paying && styles.customBtnDisabled]}
                onPress={onInstallmentCheckout}
                disabled={paying}
                activeOpacity={0.8}
            >
                {paying
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.secondaryBtnText}>Pay Installment</Text>
                }
            </TouchableOpacity>
            
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    orderSummary:{
        width: '95%',
        height: 'auto',
        backgroundColor: '#F8F9FB',
        margin: 10,
        padding: 8,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },

    detailComponent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8
    },

    fieldLabel:{
        color: '#6B7A99',
        fontSize: 13,
        fontWeight: '400',
    },

    fieldValue:{
        color: '#1A2233',
        fontSize: 13,
        fontWeight: '500',
    },

    installmentPrice:{
        fontSize: 13,
        fontWeight: '500',
        color: '#1A3A5C',
    },

    headingText:{
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'flex-start',
        color: '#1A2233',
    },

    line:{
        width:'100%',
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 10
    },

    primaryBtn:{
        width: '95%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A3A5C',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    secondaryBtn:{
        width: '95%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#1A3A5C',
    },

    customBtnDisabled: {
        opacity: 0.6,
    },

    primaryBtnText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    secondaryBtnText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#1A3A5C',
    },

});

export default CartListFooter;