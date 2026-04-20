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
                    <Text style={styles.title}>{item.design.designType === 'Residential' ? item.design.designCategory : item.design.designType}</Text>
                    <Text style={styles.packageContent}>Added At: {formateDate(item.added_at)}</Text>
                    <Text style={styles.packageContent}>Package: {item.packageName}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.priceText}>Price: ₹ {formatPrice(item.totalAmount)}</Text>
                    <TouchableOpacity style={styles.removeBtnBox} onPress={onDelete}>
                        <MaterialIcons name="delete-forever" size={24} color='#DC2626'/>
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
        backgroundColor: '#F8F9FB',
        borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 0.3,
        borderColor: '#E2E8F0',
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

    title:{
        fontSize: 16,
        fontWeight: '600',
        color: '#1A2233',
    },

    packageContent:{
        fontSize: 13,
        color: '#6B7A99',
        fontWeight: '400',
    },

    priceText:{
        fontSize: 16,
        fontWeight: '500',
        marginTop:18,
        color: '#D4A017',
    },

    removeBtnBox:{
        width: 30,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

});

export default CartItemBox;