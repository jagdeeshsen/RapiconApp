import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartItemBox=( { item, onDelete })=>{

    const id = item.id;

    const formatPrice=( price)=>{
        return price.toLocaleString('en-IN');
    };

    const formateDate= (date) => {
        return new Date(date).toLocaleDateString('en-IN');
    };


    return (
        <View style={styles.wrapperBox}>
            <View style= {styles.imageWrapper}>
                <Image style={styles.image} source={{uri: item.design.elevationUrls[0]}}/>
            </View>
            <View style={styles.contentWrapper}>
                <View>
                    <Text style={styles.productContent}>{item.design.designType === 'Residential' ? item.design.designCategory : item.design.designType}</Text>
                    <Text style={styles.packageContent}>Added At: {formateDate(item.added_at)}</Text>
                    <Text style={styles.packageContent}>Package: {item.packageName}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.priceText}>Price: ₹ {formatPrice(item.totalAmount)}</Text>
                    <TouchableOpacity style={styles.removeBtnBox} onPress={onDelete}>
                        <MaterialIcons name="delete-forever" size={24} color='#000'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    wrapperBox:{
        width: '95%',
        height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },

    imageWrapper:{
        flex: 1,
    },

    image:{
        width: '95%',
        height: '95%',
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        borderRadius: 10,
        overflow: 'hidden',
        marginStart: 5,
    },

    contentWrapper:{
        flex: 2,
        marginStart: 15,
    },

    productContent:{
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Roboto-Bold',
    },

    packageContent:{
        fontSize: 12,
        color: 'gray',
        fontFamily: 'Roboto-Bold',
    },

    priceText:{
        fontSize: 16,
        fontWeight: '700',
        marginTop:18,
        fontFamily: 'Roboto-Bold',
    },

    removeBtnBox:{
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#f7f7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

});

export default CartItemBox;