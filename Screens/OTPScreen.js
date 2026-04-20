import { StyleSheet, Text, TouchableOpacity, View, TextInput, StatusBar } from "react-native";
import CustomBackBtn from "../Components/CustomBackBtn";
import { useEffect, useState } from "react";
import { userService } from "../Service/UserService";
import { saveAuthData } from "../utils/authStorage";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPScreen= ({ route, setIsLoggedIn })=> {

    const { phone }= route.params;

    const [otp, setOtp]= useState('');

    const [error, setError]= useState('');

    const[timer, setTimer]= useState(60);
    const[isResendDisabled, setIsResendDisabled]= useState(true);

    useEffect(()=>{
        let interval;

        if(isResendDisabled && timer> 0){
            interval= setInterval(()=>{
                setTimer((prev)=> prev-1);
            }, 1000);
        }

        if(timer === 0){
            setIsResendDisabled(false);
            clearInterval(interval);
        }

        return ()=> clearInterval(interval);
    }, [timer, isResendDisabled]);


    const OnChangeText = (text) => {

        let err= '';
        if( text.length > 0 && text.length!== 6){
            err= 'Invalid OTP';
        }

        setError(err);
        setOtp(text);

    };

    const handleVarifyOTP = async () => {
        try{

            const loginData= {phone, otp};

            const result= await userService.varifyOTP(loginData);

            await saveAuthData(result.token, result.id, result.fullName, phone);

            setError('');
            setOtp('');
            setIsLoggedIn(true);
        }catch(error){
            console.log('Varify otp error', error.message);
            throw new Error(error.message);
        }
    };

    const handleResendOTP = async () => {
        try{
            const result = await  userService.sendOTP(phone);
            alert(result.message);

            setTimer(60);
            setIsResendDisabled(true);
            setError('');
            setOtp('');
        }catch(error){
            console.log('Resend otp error', error.message);
            throw new Error(error.message);
        }
    };

    const isOTPValid= otp.length === 6;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
            <View style={styles.backBtn}>
                <CustomBackBtn screen='Sign In'/>
            </View>
            <Text style={styles.heading}>Varify OTP</Text>
            <Text style={styles.subHeading}>We’ve sent a one-time password to your{' '}
                <Text style={{fontWeight: '600', color: '#1A3A5C'}}>{phone}</Text> {' '}number.</Text>
            <Text style={styles.mainHeading}>OTP *</Text>
            <View style={[styles.inputContainer, {borderColor:  error ? 'red': '#ffffff'}]}>
                <TextInput 
                    onChangeText= {(text)=> OnChangeText(text)} 
                    style={styles.input} 
                    placeholder='Enter OTP' 
                    keyboardType='phone-pad'
                    maxLength={6}
                />
            </View>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null }

            <TouchableOpacity 
                style={[styles.registerBtn, { backgroundColor: isOTPValid ? '#1A3A5C' : '#FFFFFF'}]}
                onPress={handleVarifyOTP}
                disabled= {!isOTPValid}
            >
                <Text style={[styles.btnText, {color: isOTPValid ? '#FFFFFF' : '#1A3A5C'}]}>Varify</Text>
            </TouchableOpacity>

            <View style={styles.TAndCContainer}>
                <Text style={{color: '#1A2233'}}>Didn't recieve the OTP? </Text>
                <TouchableOpacity 
                    onPress={handleResendOTP}
                    disabled={isResendDisabled}>
                    <Text style={[styles.clickableText, {color: isResendDisabled ? '#E8F0FA' : '#1A3A5C'}]}>
                        { isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}</Text>
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
        fontSize: 20,
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

    registerBtn:{
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        opacity:  1,
    },

    btnText:{
        fontSize: 18,
        fontWeight: '700',
    },

    errorText:{
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 5,
        marginStart: 20,
    },

    TAndCContainer:{
        flexDirection: 'row',
        
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    clickableText:{
        fontSize: 14,
        fontWeight: '700',
    },
});

export default OTPScreen;