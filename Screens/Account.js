import Ionicons from 'react-native-vector-icons/Ionicons'
import { Linking, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import ProfileCategoryBox from "../Components/ProfileCategoryBox";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { userService } from "../Service/UserService";
import { checkToken, getAuthData, removeAuthData } from "../utils/authStorage";
import { useCallback, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const getInitials = () => {
        if (!name) return '';

        const parts = name.trim().split(/\s+/);

        const first = parts[0]?.[0] || '';
        const last = parts.length > 1 ? parts[parts.length - 1][0] : '';

        return (first + last).toUpperCase();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A3A5C"/>
            <ScrollView style={{width: '100%'}}>
                <View style={styles.header}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials()}</Text>
                        </View>
                        <View style={{marginStart: 10}}>
                            <Text style={styles.fullNameText}>{name}</Text>
                            <Text style={styles.phoneText}>{phone}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.heading}>ACCOUNT</Text>
                <View>
                    <ProfileCategoryBox name ='My Profile' icon='person-circle-outline' onPress={()=> navigation.navigate('My Profile')}/>
                    <ProfileCategoryBox name ='My Orders' icon='bag-handle-outline' onPress={() => navigation.navigate('My Order')}/>
                    <ProfileCategoryBox name ='Payments' icon='card-outline' onPress={() => navigation.navigate('My Order')}/>
                </View>

                <Text style={styles.heading}>PREFERENCES</Text>
                <View>
                    <ProfileCategoryBox name ='About us' icon='information-circle-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                    <ProfileCategoryBox name ='Our Services' icon='construct-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                </View>

                <Text style={styles.heading}>SUPPORT</Text>
                <View style={styles.accountInfo}>
                    <ProfileCategoryBox name ='Help Center' icon='help-circle-outline' onPress={() => navigation.navigate('Support')}/>
                    <ProfileCategoryBox name ='Terms & Conditions' icon='document-text-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/terms-privacy.html')}/>
                    <ProfileCategoryBox name ='Privacy Policy' icon='lock-closed-outline' onPress={() => Linking.openURL('https://rapiconinfra.com/privacy-policy.html')}/>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F9FB',
        alignItems: 'center',
    },

    header:{
        width: '100%',
        height: 90,
        backgroundColor: '#1A3A5C',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: 15,
    },

    heading:{
        fontSize: 14,
        fontWeight: '600',
        alignSelf: 'flex-start',
        margin: 12,
        color: '#6B7A99',
    },

    avatar:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F0FA',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText:{
        fontSize: 16,
        fontWeight: '700',
        color: '#1A3A5C',
    },

    fullNameText:{
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    phoneText:{
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
    },

    logoutBtn:{
        width: '95%',
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },

    logoutBtnText:{
        fontSize: 16,
        fontWeight: '700',
        color: '#1A3A5C',
    },
});

export default Account;