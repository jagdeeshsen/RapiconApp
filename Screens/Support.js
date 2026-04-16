import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react";
import { SupportService } from '../Service/SupportService';

const Support = () => {
    
    const[form, setForm] = useState({
        fullName: '',
        phone: '',
        email: '',
        query: ''
    });

    const [errors, setErrors]= useState({});

    const isValidPhone=(phone)=>{
        return /^[6-9]\d{9}$/.test(phone);
    };

    const isValidEmail=(email)=>{
        return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    const handleOnChange = (key, value) => {
        setForm( prev => ({...prev, [key]: value}));

        let err={...errors};

        if(key === 'email'){
            err.email = isValidEmail(value) ? '' : 'Invalid email';
        }
        
        if(key === 'name'){
            err.fullName = value.length>=2 ? '' : 'Name too short'; 
        }
        
        if( key === 'phone'){
            err.phone = isValidPhone(value) ? '': 'Phone number is incorrect';
        }

        setErrors(err);
    };

    const handleOnSubmit = async () => {
        try{
            const response = await SupportService.submitCustomerQuery(form);
            Alert.alert('Message:', response.message);
        }catch(error){
            console.log('Failed to submit query. Please try again.');
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.box}>
                <View style={styles.iconBox}>
                    <MaterialIcons name="phone" size={24} color='#2b61c7'/>
                </View>

                <View style={styles.contentBox}>
                    <Text style={{color: '#ccc'}}>Our 24X7 Customer Service</Text>
                    <Text style= {{color: '#2b61c7', fontWeight: 'bold'}}>+91 7314342979</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconBox}>
                    <MaterialIcons name="email" size={24} color='#2b61c7'/>
                </View>

                <View style={styles.contentBox}>
                    <Text style={{color: '#ccc'}}>Write us at</Text>
                    <Text style={{color:'#2b61c7', fontWeight: 'bold'}}>support@rapiconinfra.com</Text>
                </View>
            </View>

            <View style={styles.box}>
                <View style={styles.iconBox}>
                    <MaterialIcons name="place" size={24} color='#2b61c7'/>
                </View>

                <View style={styles.contentBox}>
                    <Text style={{color: '#ccc'}}>Reach out to us</Text>
                    <Text style={{color:'#2b61c7', fontWeight: 'bold'}}>29, Bhagwandeen Nagar, Behind Sapna</Text>
                    <Text style={{color:'#2b61c7', fontWeight: 'bold'}}>Sangeeta, Indore, (M.P.) Pin-452001</Text>
                </View>
            </View>

            <View style={styles.queryContainer}>
                <Text style={styles.headingText}>Contact us</Text>

                <Text style={styles.subHeadingText}>Name</Text>
                <View style={styles.queryBox}>
                    <MaterialIcons name="person" size={24} color='#2b61c7' style={styles.iconStyle}/>
                    <TextInput
                        value={form.name}
                        placeholder="Enter name"
                        keyboardType="text"
                        onChangeText={(text) => handleOnChange('name', text)}
                        style={styles.input}
                        error = {errors.name}
                    />
                </View>

                <Text style={styles.subHeadingText}>Phone</Text>
                <View style={styles.queryBox}>
                    <MaterialIcons name="phone" size={24} color='#2b61c7' style={styles.iconStyle}/>
                    <TextInput
                        value={form.phone}
                        placeholder="Enter phone"
                        keyboardType="phone-pad"
                        onChangeText={(text) => handleOnChange('phone', text)}
                        style={styles.input}
                        maxLength={10}
                        error = {errors.phone}
                    />
                </View>

                <Text style={styles.subHeadingText}>Email</Text>
                <View style={styles.queryBox}>
                    <MaterialIcons name="email" size={24} color='#2b61c7' style={styles.iconStyle}/>
                    <TextInput
                        value={form.email}
                        placeholder="Enter email"
                        keyboardType="text"
                        onChangeText={(text) => handleOnChange('email', text)}
                        style={styles.input}
                        error = {errors.email}
                    />
                </View>


                <Text style={styles.subHeadingText}>Message</Text>
                <View style={styles.queryBox}>
                    <MaterialIcons name="message" size={24} color='#2b61c7' style={styles.iconStyle}/>
                    <TextInput
                        value={form.message}
                        placeholder="Enter message"
                        keyboardType="text"
                        onChangeText={(text) => handleOnChange('message', text)}
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style= {styles.bookNowBox} onPress={handleOnSubmit}>
                    <Text style={styles.bookNowBtn}>Submit</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.queryContainer}>
                <Text style={styles.headingText}>How to become a seller</Text>

                <Text>1. Go to our official website: https://rapiconinfra.com</Text>
                <Text>2. Click on start selling at the top right corner</Text>
                <Text>3. On landing page click on get started button and create account</Text>
                <Text>4. Login your account to upload, and manage designs</Text>

                <TouchableOpacity style= {styles.bookNowBox} onPress={()=> Linking.openURL('https://rapiconinfra.com/vendor-landing.html')}>
                    <Text style={styles.bookNowBtn}>Go to website</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles= StyleSheet.create({
    container:{
        padding: 15,
        
    },

    box:{
        width: '100%',
        height: 80,
        padding: 10,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        borderRadius:15,
        flexDirection: 'row',
    },

    iconBox:{
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#f4f5fc',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    contentBox:{
        marginStart: 15,
        justifyContent: 'center',
    },

    headingText:{
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#000',
    },

    subHeadingText:{
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        marginStart: 5,
    },

    queryContainer:{
        width: '100%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        marginTop: 10,
        marginBottom: 15,
    },

    queryBox:{
        width: '100%',
        backgroundColor: '#f4f5fc',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'row',
    },

    iconStyle: {
        margin: 10,
    },

    input:{
        flex: 1,
        height: 40,
    },

    bookNowBox:{
        
        padding: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#2b61c7',
    },

    bookNowBtn:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    dropDownPicker:{
        marginBottom: 20,
    }
});

export default Support;