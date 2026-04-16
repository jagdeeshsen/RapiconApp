import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartListHeader= ()=>{

    const navigation= useNavigation();

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={22} color='#000'/>
            </TouchableOpacity>
            <Text style={styles.headingText}>My Cart</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Account', {screen:'My Order'})} style={styles.touchableOpacity}>
                <Ionicons name="bag-check-outline" size={24} color='#000'/>
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    wrapper:{
        width: '100%',
        height: 'auto',
        padding: 20,
        
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    headingText:{
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
    },

    touchableOpacity:{
        alignSelf: 'flex-end',
        borderRadius: 8,
        padding: 3,
        backgroundColor: 'white',
    },
});

export default CartListHeader;