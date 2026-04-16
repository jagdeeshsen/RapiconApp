import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductCard =({ item })=>{

    const navigation= useNavigation();

    const formatPrice=(price)=>{
        return price.toLocaleString('en-IN');
    }

    return (
        <TouchableOpacity 
            style={styles.productContainer}
            onPress={()=> navigation.navigate('ProductInfo', {productId: item.id})}>
                <Image 
                    style={styles.cardImg} 
                    source={{uri: item.elevationUrls[0]}}
                />
                <View style={styles.mainContent}>
                    <Text style={styles.mainText}>{item.designType === 'Residential' ? item.designCategory : item.designType}</Text>
                    <Text style={styles.mainText}> ₹ {formatPrice(item.builtUpArea*5)}</Text>
                </View>
                <Text style={styles.secondText}>Size: {item.width}X{item.length} </Text>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    productContainer:{
        width: 175,
        height: 220,
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 8,
        
    },

    cardImg:{
        width: '100%',
        height: 160,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        resizeMode: 'cover',
        alignSelf:'stretch'
    },

    mainText:{
        fontSize: 14, 
        fontWeight: '600', 
        fontFamily: 'Poppins-Bold',
        marginStart: 5,
        marginEnd: 5,
        marginTop: 5, 
        alignSelf: 'flex-start',
    },

    secondText:{
        fontSize: 14,
        color: 'darkgray',
        marginStart: 5,
    },

    mainContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default ProductCard;