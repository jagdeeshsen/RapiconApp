import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import CustomBackBtn from "../Components/CustomBackBtn";
import { useEffect, useState } from "react";
import { userService } from "../Service/UserService";
import { saveAuthData } from "../utils/authStorage";

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
        <View style={styles.container}>
            <View style={styles.backBtn}>
                <CustomBackBtn screen='Sign In'/>
            </View>
            <Text style={styles.heading}>Varify OTP</Text>
            <Text style={styles.subHeading}>We’ve sent a one-time password to your{' '}
                <Text style={{fontWeight: '800'}}>{phone}</Text> {' '}number.</Text>
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
                style={[styles.registerBtn, { backgroundColor: isOTPValid ? 'green' : '#ccc'}]}
                onPress={handleVarifyOTP}
                disabled= {!isOTPValid}
            >
                <Text style={styles.btnText}>Varify</Text>
            </TouchableOpacity>

            <View style={styles.TAndCContainer}>
                <Text>Didn't recieve the OTP? </Text>
                <TouchableOpacity 
                    onPress={handleResendOTP}
                    disabled={isResendDisabled}>
                    <Text style={[styles.clickableText, {color: isResendDisabled ? 'gray' : 'darkgreen'}]}>
                        { isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}</Text>
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
        fontWeight: '300',
        color: 'darkgreen',
    },
});

export default OTPScreen;