import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IntputBox from "../Components/InputBox";
import { useNavigation } from "@react-navigation/native";
import CustomBackBtn from "../Components/CustomBackBtn";
import { userService } from "../Service/UserService";
import { useState } from "react";

const SignUp= ()=>{

    const[form, setForm]= useState({
        person: '',
        email: '',
        phone: ''
    });


    const navigation= useNavigation();

    const[agreed, setAgreed]= useState(false);

    const [errors, setErrors]= useState({});

    const isValidEmail=(email)=>{
        return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone=(phone)=>{
        return /^[6-9]\d{9}$/.test(phone);
    }

    const handleOnChange=(key, value)=>{
        setForm( prev=> ({...prev, [key]: value }));

        let err= {...errors};

        if(key === 'email'){
            err.email = isValidEmail(value) ? '': 'Invalid Email';
        }

        if(key === 'phone'){
            err.phone= isValidPhone(value) ? '': 'Invalid phone number';
        }

        if(key === 'person'){
            err.person = value.length >=2 ? '': 'Name too short';
        }

        setErrors(err);
    };

    const handleOnCreateUser= async ()=>{
        try{
            const phone= form.phone.trim();  //'8965923178';
            // create user
            const res= await userService.createUser(form);
            alert(res.message);

            // send otp
            const result= await userService.sendOTP(phone);
            alert(result.message);

            setForm({person: '',
            email: '',
            phone: ''});
            setErrors({});
            setAgreed(false);

            navigation.navigate('OTP Screen', { phone });
        }catch(error){
            alert(err.message);
        }

    };


    const isFormValid= form.person && form.email && form.phone && agreed && !errors.email && !errors.phone && !errors.person;

    return (
        <View style={styles.container}>
            <View style={styles.backBtn}>
                <CustomBackBtn screen='Welcome Screen'/>
            </View>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.subHeading}>Bring your construction vision to life with simple tools for planning and progress.</Text>

            <Text style={styles.mainHeading}>Full Name *</Text>
            <IntputBox
                icon='person' 
                placeholder='Full name' 
                OnChangeText={handleOnChange}
                value={form.person}
                error={errors.person}
            />

            <Text style={styles.mainHeading}>Email *</Text>
            <IntputBox 
                icon='email' 
                placeholder='Email address' 
                keyboardType={'email-address'} 
                OnChangeText={handleOnChange}
                value={form.email}
                error={errors.email}
            />

            <Text style={styles.mainHeading}>Phone *</Text>
            <IntputBox 
                icon='phone' 
                placeholder='phone' 
                keyboardType='phone-pad' 
                OnChangeText={handleOnChange} 
                value={form.phone}
                maxLen={10}
                error={errors.phone}
            />

            <View style={styles.TAndCContainer}>
                <TouchableOpacity 
                    style={[styles.checkBox, agreed && { backgroundColor: 'green', borderColor: 'green' }]}
                    onPress={() => setAgreed(prev=> !prev)}
                >
                    {agreed && <Text style={{ color: '#fff', fontSize: 16 }}>✓</Text>}
                </TouchableOpacity>


                <Text style= {styles.TAndCText}> I agree to the </Text>
                <TouchableOpacity onPress={()=> Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}>
                    <Text style={styles.clickableText}> Terms of Service </Text>
                </TouchableOpacity>
                <Text> and </Text>
                <TouchableOpacity onPress={()=> Linking.openURL('https://rapiconinfra.com/privacy-policy.html')}>
                    <Text style={styles.clickableText}> Privacy Policy. </Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity 
                style={[styles.registerBtn, {backgroundColor: isFormValid ? 'green' : '#ccc'}]}
                disabled={!isFormValid}
                onPress={handleOnCreateUser}>
                <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.TAndCContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Sign In')}>
                    <Text style={styles.clickableText}>Sign in here</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f6f8fa',
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

    checkBox:{
        width: 18,
        height: 18,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#555',
        justifyContent: 'center',
        alignItems: 'center',
    },

    TAndCText:{
        fontSize: 14,
        fontWeight: '400',
    },

    clickableText:{
        fontSize: 14,
        fontWeight: '300',
        color: 'green',
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
});

export default SignUp;