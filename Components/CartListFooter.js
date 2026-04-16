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
                    <Text>Subtotal:</Text>
                    <Text> ₹ {formatePrice(price)}</Text>
                </View>

                <View style={styles.detailComponent}>
                    <Text>Tax (18%):</Text>
                    <Text> ₹ {formatePrice(tax)}</Text>
                </View>

                <View style={styles.line}/>

                <View style={styles.detailComponent}>
                    <Text>Total:</Text>
                    <Text> ₹ {formatePrice(total)}</Text>
                </View>

                <View style={styles.detailComponent}>
                    <Text>Installment:</Text>
                    <Text> ₹ {formatePrice(total/10)}</Text>
                </View>
                
            </View>
            
            <TouchableOpacity
                style={[styles.customBtn, paying && styles.customBtnDisabled]}
                onPress={onCheckout}
                disabled={paying}
                activeOpacity={0.8}
            >
                {paying
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.btnText}>Pay Now</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.customBtn, paying && styles.customBtnDisabled]}
                onPress={onInstallmentCheckout}
                disabled={paying}
                activeOpacity={0.8}
            >
                {paying
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.btnText}>Pay in Installment</Text>
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
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 15,
        
    },

    detailComponent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },

    headingText:{
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'flex-start',
    },

    line:{
        width:'100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10
    },

    customBtn:{
        width: '95%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'royalblue',
        borderRadius: 10,
        marginBottom: 10,
    },

    customBtnDisabled: {
        opacity: 0.6,
    },

    btnText:{
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },

});

export default CartListFooter;