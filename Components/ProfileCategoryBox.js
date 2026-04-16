import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProfileCategoryBox = ({ name, icon, onPress})=>{

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Ionicons name={ icon } size={22} color='black'/>
                <Text style={styles.nameText}>{ name }</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name="chevron-forward" size={18} color='black'/>
            </TouchableOpacity>
            
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        elevation: 0.15,
        padding: 5,
    },

    contentBox:{
        flexDirection: 'row',
    },

    nameText:{
        marginStart: 5,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ProfileCategoryBox;