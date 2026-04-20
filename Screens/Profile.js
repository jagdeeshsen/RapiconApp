import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userService } from "../Service/UserService";
import { getAuthData, removeAuthData } from "../utils/authStorage";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../Components/ConfirmModal";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile= ({ setIsLoggedIn }) => {

    const[user, setUser]= useState({
        id: '',
        fullName: '',
        phone: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    });

    const[isEditable, setIsEditable]= useState(false);
    const[loading, setLoading]= useState(true);
    const [error, setError]= useState('');

    // cofirm modal state
    const[modalVisible, setModalVisible] = useState(false);
    const[modalType, setModalType]= useState('confirm');
    const[otp, setOtp]= useState('');

    const handleOnChange = (key, value) => {
        setUser({...user, [key]: value});
    };

    useEffect(()=>{
        const init = async () => {
            try{
                const authData= await getAuthData();
            
                if(!authData?.userId){
                    setError('User ID not found. Please login again.');
                    setLoading(false);
                    return ;
                }

                await fetchUserProfile(authData?.userId);
            }catch(err){
                setError(err.message || 'Failed to fetch user data.');
            }finally{
                setLoading(false);
            }
        };
        
        init();
    }, []);

    const navigation= useNavigation();

    const fetchUserProfile = async (userId) => {
        try{
            setLoading(true);
            setError(null);

            const userData= await userService.getUserById(userId);
            setUser(userData);
        }catch(err){
            setError('Something went wrongh. Please try again.');
        }finally{
            setLoading(false);
        }
    };

    if(loading){
        return (<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={32}/>
        </View>
    )}

    if(error){
        return (
            <View>
                <Text style={{color: 'red'}}>{error}</Text>
            </View>
        );
    }

    const handleSave =  async () => {
        try{
            const result = await userService.updateUser(user);
            setIsEditable(false);
            alert(result.message);
        }catch(err){
            console.log('User update error', err.message);
            throw err;
        }
    };

    const handleDelete = () => {
        setModalType('confirm');
        setModalVisible(true);
        
    };

    const askOTP = async () => {
        setOtp('');
        const result= await userService.sendOTP(user.phone.trim());

        setModalType('prompt');
        setModalVisible(true);
    }

    const handleConfirm = () => {

        if(modalType === 'confirm'){
            askOTP();
        }else{
            deleteAccount(otp);
        }

        setModalVisible(false);
    };

    const deleteAccount = async (otp) => {
        const result = await userService.deleteUser({otp: otp});
        alert(result.message);
        
        // logged out user
        const response= await userService.logoutUser();
        removeAuthData();
        setIsLoggedIn(false);
    };

    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F8F9FB'}}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={()=> navigation.goBack()}>
                        <Ionicons name="chevron-back" size={22} color='#1A2233'/>
                    </TouchableOpacity>

                    <Text style={styles.title}>My Profile</Text>

                    <TouchableOpacity style={styles.editIcon} onPress={()=> setIsEditable(true)}>
                        <Ionicons name="create-outline" size={22} color='#1A2233'/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.heading}>Name</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.fullName}
                    editable={isEditable}
                    placeholder="Enter name"
                    onChangeText={(text) => handleOnChange('fullName', text)}
                />

                <Text style={styles.heading}>Phone</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: "#ccc"}]} 
                    value={user.phone}
                    editable={false}
                    placeholder="Enter phone"
                    onChangeText={(text) => handleOnChange('phone', text)}
                />

                <Text style={styles.heading}>Email</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.email}
                    editable={isEditable}
                    placeholder="Enter email"
                    onChangeText={(text) => handleOnChange('email', text)}
                />

                <Text style={styles.heading}>Street</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.streetAddress}
                    editable={isEditable}
                    placeholder="Enter street"
                    onChangeText={(text) => handleOnChange('streetAddress', text)}
                />

                <Text style={styles.heading}>City</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.city}
                    editable={isEditable}
                    placeholder="Enter city"
                    onChangeText={(text) => handleOnChange('city', text)}
                />

                <Text style={styles.heading}>State</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.state}
                    editable={isEditable}
                    placeholder="Enter state"
                    onChangeText={(text) => handleOnChange('state', text)}
                />

                <Text style={styles.heading}>Country</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.country}
                    editable={isEditable}
                    placeholder="Enter country"
                    onChangeText={(text) => handleOnChange('country', text)}
                />

                <Text style={styles.heading}>Zipcode</Text>
                <TextInput 
                    style={[styles.inputBox, {borderColor: isEditable? '#000' : "#ccc"}]} 
                    value={user.zipCode}
                    editable={isEditable}
                    placeholder="Enter zipcode"
                    onChangeText={(text) => handleOnChange('zipCode', text)}
                />

                <TouchableOpacity style={styles.deleteButton} onPress={isEditable? handleSave : handleDelete}>
                    <Text style={[styles.btnText, {color : isEditable ? '#1A3A5C' : 'red'}]}>
                        {isEditable ? 'Save' : 'Delete Account'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.deleteWarning}>{ isEditable ? '' : 'Deleting your account will remove all your orders and all activities.'}</Text>

                <ConfirmModal 
                    visible={modalVisible}
                    message={modalType === 'confirm' ? 'Warning: This action is parmanent. Are you sure you want to delete your account.' : 'We have sent OTP to your registered number.'}
                    type={modalType}
                    title={modalType === 'confirm' ? 'Confirm' : 'Prompt'}
                    inputValue={otp}
                    setInputValue={setOtp}
                    onConfirm={handleConfirm}
                    onCancel={()=> setModalVisible(false)}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles= StyleSheet.create({

    container:{
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },

    header:{
        width: '100%',
        height: 70,
        backgroundColor: '#F8F9FB',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
    },

    heading:{
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginStart: 22,
        marginTop: 10,
        color: '#1A3A5C',
    },

    inputBox:{
        width: '90%',
        borderWidth: 0.5,
        padding: 12,
        borderRadius: 12,
        fontSize: 14,
        backgroundColor: "#FFFFFF",
        marginTop: 5,
        borderColor: '#E2E8F0',
    },

    deleteButton:{
        width: '90%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnText:{
        fontSize: 16,
        fontWeight: '600',
        color: '#DC2626',
    },

    editIcon:{
        alignSelf: 'flex-end',
    },

    touchableOpacity:{
        alignSelf: 'flex-end',
        borderRadius: 8,
        padding: 3,
    },

    title:{
        fontSize: 16,
        fontWeight: '600',
        alignItems: 'center',
        marginTop: 20,
        color: '#1A2233',
    },

    deleteWarning:{
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 40,
        textAlign: 'center',
    },

});

export default Profile;