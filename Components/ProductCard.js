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
            onPress={()=> navigation.navigate('ProductInfo', {productId: item.id})}
        >
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.cardImg} 
                    source={{uri: item.elevationUrls[0]}}
                />

                <Text style={styles.categoryBadge}>
                    {item.designType === 'Residential' ? item.designCategory : item.designType}
                </Text>
            </View>
            <View style={styles.content}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: '400', color: '#1A2233'}}>Size: </Text>
                    <Text style={styles.titleText}>{item.width}X{item.length} ft</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: '400', color: '#1A2233'}}>price: </Text>
                    <Text style={styles.priceText}> ₹ {formatPrice(item.builtUpArea*5)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    productContainer:{
        width: 170,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        margin: 8,
        // Shadow (iOS)
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        // Elevation (Android)
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    imageContainer:{
        position: 'relative',
    },

    cardImg:{
        width: '100%',
        height: 140,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    categoryBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: '#D4A017',
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },

    priceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#D4A017',
        marginTop: 2,
    },

    titleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },

    content:{
        padding: 8,
    },
});

export default ProductCard;