import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'

const ProfileCategoryBox = ({ name, icon, onPress})=>{

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Ionicons name={ icon } size={22} color='#1A3A5C'/>
                <Text style={styles.nameText}>{ name }</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name="chevron-forward" size={16} color='#B0B8C9'/>
            </TouchableOpacity>
            
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 10,
        marginEnd: 10,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },

    contentBox:{
        flexDirection: 'row',
        marginStart: 5,
    },

    nameText:{
        marginStart: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#1A3A5C',
    },
});

export default ProfileCategoryBox;