import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Linking, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useState } from "react";
import { SupportService } from '../Service/SupportService';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        
        if(key === 'fullName'){
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
	<>
	<StatusBar barStyle = 'light-content' />
        <SafeAreaView edges = {[ 'left', 'right' ]} style={{flex: 1, backgroundColor: '#F8F9FB'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.box}>
                    <View style={styles.iconBox}>
                        <MaterialIcons name="phone" size={24} color='#1A3A5C'/>
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={{color: '#2E6DA4'}}>Our 24X7 Customer Service</Text>
                        <Text style= {{color: '#1A3A5C', fontWeight: '600', fontSize: 14}}>+91 7314342979</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.iconBox}>
                        <MaterialIcons name="email" size={24} color='#1A3A5C'/>
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={{color: '#2E6DA4'}}>Write us at</Text>
                        <Text style={{color:'#1A3A5C', fontWeight: '600', fontSize: 14}}>support@rapiconinfra.com</Text>
                    </View>
                </View>

            

                <View style={styles.queryContainer}>
                    <Text style={styles.headingText}>Contact us</Text>

                    <View style={styles.queryBox}>
                        <MaterialIcons name="person" size={24} color='#1A3A5C' style={styles.iconStyle}/>
                        <TextInput
                            value={form.fullName}
                            placeholder="Enter name"
                            keyboardType="default"
                            onChangeText={(text) => handleOnChange('fullName', text)}
                            style={styles.input}
              
                        />
                    </View>

                    <View style={styles.queryBox}>
                        <MaterialIcons name="phone" size={24} color='#1A3A5C' style={styles.iconStyle}/>
                        <TextInput
                            value={form.phone}
                            placeholder="Enter phone"
                            keyboardType="phone-pad"
                            onChangeText={(text) => handleOnChange('phone', text)}
                            style={styles.input}
                            maxLength={10}
                            
                        />
                    </View>

                    <View style={styles.queryBox}>
                        <MaterialIcons name="email" size={24} color='#1A3A5C' style={styles.iconStyle}/>
                        <TextInput
                            value={form.email}
                            placeholder="Enter email"
                            keyboardType="email-address"
                            onChangeText={(text) => handleOnChange('email', text)}
                            style={styles.input}
                            
                        />
                    </View>

                    <View style={styles.queryBox}>
                        <MaterialIcons name="chat" size={24} color='#1A3A5C' style={styles.iconStyle}/>
                        <TextInput
                            value={form.query}
                            placeholder="Enter message"
                            keyboardType="default"
                            onChangeText={(text) => handleOnChange('query', text)}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity style= {styles.bookNowBox} onPress={handleOnSubmit}>
                        <Text style={styles.bookNowBtn}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.queryContainer}>
                    <Text style={styles.headingText}>How to become a seller</Text>

                    <Text style={styles.points}>1. Go to our official website: https://rapiconinfra.com</Text>
                    <Text style={styles.points}>2. Click on start selling at the top right corner</Text>
                    <Text style={styles.points}>3. On landing page click on get started button and create account</Text>
                    <Text style={styles.points}>4. Login your account to upload, and manage designs</Text>

                    <TouchableOpacity style= {styles.bookNowBox} onPress={()=> Linking.openURL('https://rapiconinfra.com/vendor-landing.html')}>
                        <Text style={styles.bookNowBtn}>Go to website</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
	</>
    );
};

const styles= StyleSheet.create({
    container:{
        padding: 10,
    },

    box:{
        width: '100%',
        height: 80,
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        borderRadius:15,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },

    iconBox:{
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#E8F0FA',
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
        color: '#1A2233',
    },

    queryContainer:{
        width: '100%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        marginTop: 5,
        marginBottom: 15,
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },

    queryBox:{
        width: '100%',
        backgroundColor: '#E8F0FA',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
    },

    iconStyle: {
        margin: 10,
    },

    input:{
        flex: 1,
        height: 40,
    },

    points:{
        fontSize: 14,
        fontWeight: '400',
        color: '#1A2233',
        marginBottom: 5,
    },

    bookNowBox:{
        padding: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#1A3A5C',
    },

    bookNowBtn:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default Support;