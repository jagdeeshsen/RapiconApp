import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native"
import IntputBox from "../Components/InputBox";
import CustomBackBtn from "../Components/CustomBackBtn";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { userService } from "../Service/UserService";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
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
                style={[styles.registerBtn, { backgroundColor: isPhoneValid ? '#1A3A5C' : '#FFFFFF'}]}
                disabled={!isPhoneValid}
                onPress={handleSendOTP}
            >
                <Text style={[styles.btnText, {color: isPhoneValid ? '#FFFFFF' : '#1A3A5C'}]}>Send OTP</Text>
            </TouchableOpacity>

            <View style={styles.TAndCContainer}>
                <Text style={{color: '#1A2233'}}>Don't have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Sign Up')}>
                    <Text style={styles.clickableText}>Sign Up here</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
    },

    mainHeading:{
        fontSize: 14,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginStart: 20,
        marginBottom: 5,
        color: '#1A2233',
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
        color: '#1A2233',
    },

    subHeading:{
        fontSize: 13,
        color: '#1A2233',
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
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    btnText:{
        fontSize: 18,
        fontWeight: '700',
    },

    clickableText:{
        fontSize: 14,
        fontWeight: '500',
        color: '#1A3A5C',
    },
});

export default SignIn;