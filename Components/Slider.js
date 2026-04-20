import { StyleSheet, View, Image } from "react-native";

const Slider=()=>{

    return (
        <View style={ styles.sliderCard}>
            <Image 
                source={require('../assets/background-rapicon.png')}
                style={styles.sliderImg}/>
        </View>
    )
};

const styles= StyleSheet.create({
    sliderCard:{
        width: '100%',
        height: 180,
        backgroundColor: 'white',
        borderRadius: 18,
        alignSelf: 'center',
        marginTop: 15
    },

    sliderImg:{
        width: '100%',
        height: 180,
        overflow: 'hidden',
        borderRadius: 18
    },

});

export default Slider;