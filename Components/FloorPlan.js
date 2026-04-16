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
        height:200,
        borderRadius:12,
        backgroundColor:'#fff',
        margin:8,
        overflow:'hidden',
        padding: 8,
        alignItems: 'center',
    },

    image:{
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },

    nameText:{
        fontSize:16,
        fontWeight:'600',
        marginBottom: 10,
    },

});

export default FloorPlan;