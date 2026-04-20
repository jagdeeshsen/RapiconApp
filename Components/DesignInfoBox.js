import { StyleSheet, Text, View } from "react-native";

const DesignInfoBox = ({ title, quantity }) => {

    return (
        <View style={styles.Box}>
            <Text style={styles.label}>{title}</Text>
            <Text style={styles.value}>{quantity}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Box:{
        width: 100,
        height: 80,
        backgroundColor: '#E8F0FA',
        borderRadius: 12,
        marginRight: 12,
        padding: 10,
        alignItems: 'center'
    },

    label:{
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 5,
        color: '#6B7A99',
    },

    value:{
        fontSize: 16,
        fontWeight: '500',
        color: '#1A2233',
    },
});

export default DesignInfoBox;