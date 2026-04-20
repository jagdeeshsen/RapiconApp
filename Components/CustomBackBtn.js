import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBackBtn=({ screen })=>{

    const navigation= useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate(screen)}>
            <Icon name="chevron-back" size={22} color='#1A3A5C' fontWeight={600}/>
        </TouchableOpacity>

    );
};

const styles=StyleSheet.create({
    container:{
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default CustomBackBtn;