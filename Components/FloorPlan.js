import { Image, StyleSheet, Text, View } from "react-native";

const FloorPlan = ({ floor, url }) => {

    return (
        <View style={styles.box}>
            <Text style={styles.nameText}>Floor {floor}</Text>
            <Image source={{uri: url}} style={styles.image} blurRadius={10}/>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width:'45%',
        height:160,
        borderRadius:15,
        backgroundColor:'#ffffff',
        overflow:'hidden',
        padding: 8,
        margin:8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
    },

    image:{
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },

    nameText:{
        fontSize:14,
        fontWeight:'500',
        marginBottom: 10,
        color: '#6B7A99',
    },

});

export default FloorPlan;