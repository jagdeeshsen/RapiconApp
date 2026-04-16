import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

const DesignInfoBox = ({ title, icon, quantity }) => {

    return (
        <View style={styles.Box}>
            <MaterialCommunityIcons name={icon} size={24} color='#000'/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.quantity}>{quantity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Box:{
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginRight: 12,
        padding: 10,
        alignItems: 'center'
    },

    title:{
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },

    quantity:{
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DesignInfoBox;