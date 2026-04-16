import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuthData } from './utils/authStorage';
import AppStack from './Navigation/AppStack';
import AuthStack from './Navigation/AuthStack';


export default function App() {

  const [isLoggedIn, setIsLoggedIn]= useState(false);
  
  useEffect( () => {

    const checkAuth = async () => {
      const authData = await getAuthData();

      if(authData?.token){
        setIsLoggedIn(true);
      }
    }

    checkAuth();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="royalblue" />
      <NavigationContainer>
        {isLoggedIn ? <AppStack setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn}/>}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}