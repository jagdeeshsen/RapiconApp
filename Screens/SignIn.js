import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import IntputBox from "../Components/InputBox";
import CustomBackBtn from "../Components/CustomBackBtn";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { userService } from "../Service/UserService";

const SignIn=()=>{

    const [phone, setPhone]= useState('');

    const navigation= useNavigation();

    const [error, setError]= useState('');

    const isValidPhone=(phone)=>{
        return /^[6-9]\d{9}$/.test(phone);
    }

    const handleOnChange= (key, value)=>{

        setPhone(value);

        let err= error;
        if(key === 'phone'){
            err= isValidPhone(value) ? '' : 'Invalid phone number';
        }

        setError(err);
    };

    const handleSendOTP= async () => {
        try{
            const result= await userService.sendOTP(phone.trim());
            alert(result.message);

            navigation.navigate('OTP Screen', { phone });
        }catch(error){
            alert(error.message);
            throw new Error(error.message);
        }
    };

    const isPhoneValid= phone && !error;

    return (
        <View style={styles.container}>
            <View style={styles.backBtn}>
                <CustomBackBtn screen='Welcome Screen'/>
            </View>
            <Text style={styles.heading}>Log In</Text>
            <Text style={styles.subHeading}>Enter your phone number to securly access your account and manage your service.</Text>
            <Text style={styles.mainHeading}>Phone *</Text>
            <IntputBox 
                icon='phone' 
                placeholder='Enter phone' 
                keyboardType='phone-pad' 
                OnChangeText={handleOnChange}
                value={phone}
                maxLen={10}
                error={error}
            /> 

            <TouchableOpacity 
                style={[styles.registerBtn, { backgroundColor: isPhoneValid ? 'green' : '#ccc'}]}
                disabled={!isPhoneValid}
                onPress={handleSendOTP}
            >
                <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>

            <View style={styles.TAndCContainer}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Sign Up')}>
                    <Text style={styles.clickableText}>Sign Up here</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f6f8fa',
    },

    mainHeading:{
        fontSize: 14,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginStart: 20,
        marginBottom: 5,
    },

    backBtn:{
        margin: 18,
        alignSelf: 'flex-start',
    },

    heading:{
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        margin: 5,
    },

    subHeading:{
        fontSize: 13,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
    },

    TAndCContainer:{
        flexDirection: 'row',
        
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    registerBtn:{
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        opacity:  1,
    },

    btnText:{
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },

    clickableText:{
        fontSize: 14,
        fontWeight: '300',
        color: 'darkgreen',
    },
});

export default SignIn;