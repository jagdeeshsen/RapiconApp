import Ionicons from 'react-native-vector-icons/Ionicons'
import { Linking, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ProfileCategoryBox from "../Components/ProfileCategoryBox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { userService } from "../Service/UserService";
import { checkToken, getAuthData, removeAuthData } from "../utils/authStorage";
import { useCallback, useState } from "react";

const Account =({ setIsLoggedIn })=>{

    const[name, setName] = useState('Guest');
    const[phone, setPhone] = useState('');

    const navigation= useNavigation();

    const checkLogin = async () => {
        const authData = await getAuthData();

        setName(authData?.name || 'Guest');
        setPhone(authData?.phone);

        if (!authData?.token) {
            setIsLoggedIn(false);
            return;
        }

        try {
            const auth = await checkToken();

            if(!auth){
                setIsLoggedIn(false);
            }

        } catch (err) {
            console.log("Token decode error", err);
        }
    };

    useFocusEffect(
        useCallback(() => {
        checkLogin();
        }, [])
    );

    const handleLogout = async () => {
        try{
            const result= await userService.logoutUser();
            console.log(result);
            removeAuthData();
            setIsLoggedIn(false);
        }catch(err){
            console.log('Logout error', err.message);
            throw err;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{width: '100%'}}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Account</Text>
                </View>
                <View style={styles.userInfo}>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="person-circle-outline" size={34} color='#000'/>
                        <View style={{marginStart: 8}}>
                            <Text style={styles.fullNameText}>{name}</Text>
                            <Text style={styles.phoneText}>{phone}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.heading}>Account</Text>
                <View style={styles.accountInfo}>
                    <ProfileCategoryBox name ='My Profile' icon='person-circle-outline' onPress={()=> navigation.navigate('My Profile')}/>
                    <ProfileCategoryBox name ='My Orders' icon='bag-handle-outline' onPress={() => navigation.navigate('My Order')}/>
                    <ProfileCategoryBox name ='Payments' icon='card-outline' onPress={() => navigation.navigate('My Order')}/>
                    <ProfileCategoryBox name ='Notification' icon='notifications-outline' onPress={() => navigation.navigate('My Order')}/>
                </View>

                <Text style={styles.heading}>Preferences</Text>
                <View style={styles.accountInfo}>
                    <ProfileCategoryBox name ='About us' icon='information-circle-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                    <ProfileCategoryBox name ='Our Services' icon='construct-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                </View>

                <Text style={styles.heading}>Support</Text>
                <View style={styles.accountInfo}>
                    <ProfileCategoryBox name ='Help Center' icon='help-circle-outline' onPress={() => navigation.navigate('Support')}/>
                    <ProfileCategoryBox name ='Terms & Conditions' icon='document-text-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                    <ProfileCategoryBox name ='Privacy Policy' icon='lock-closed-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/privacy-policy.html')}/>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },

    userIcon:{
        width: 40,
        height: 40,
    },

    header:{
        width: '100%',
        height: 70,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    title:{
        fontSize: 16,
        fontWeight: '700',
        alignItems: 'center',
        marginTop: 30,
    },

    userInfo:{
        width: '95%',
        height: 80,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 10,
    },

    accountInfo:{
        width: '95%',
        padding: 5,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
    },

    heading:{
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'flex-start',
        margin: 12,
        color: '#c8c8c8',
    },

    fullNameText:{
        fontSize: 16,
        fontWeight: '700',
        color: 'black',
    },

    phoneText:{
        fontSize: 14,
        fontWeight: '400',
        color: '#d6d6d6',
    },

    logoutBtn:{
        width: '95%',
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 15,
        borderColor: '#ccc',
    },

    logoutBtnText:{
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
});

export default Account;