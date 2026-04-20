import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet, Text, TextInput, View } from "react-native"


const IntputBox= ({value, icon, placeholder, keyboardType, OnChangeText, maxLen, error})=>{


    return (
        <View style={{marginBottom: 5}}>
            <View style={[styles.inputContainer, {borderColor:  error ? 'red': '#FFFFFF'}]}>
                <MaterialIcons name={icon} size={22} color={ error ? 'red': '#1A3A5C'} style={styles.icon}/>
                <TextInput 
                    onChangeText= {(text)=> OnChangeText(icon,text)} 
                    style={styles.input} 
                    value={value}
                    placeholder={placeholder} 
                    keyboardType={keyboardType}
                    maxLength={maxLen}
                />
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null }
        </View>
    );
};

const styles= StyleSheet.create({
    inputContainer:{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },

    input:{
        flex: 1,
        height: 45,
    },

    icon:{
        marginRight: 8,
    },

    errorText:{
        color: 'red',
        marginTop: 4,
        fontSize: 12,
    },
});

export default IntputBox;