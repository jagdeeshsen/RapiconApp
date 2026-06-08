import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAuthData } from './utils/authStorage';
import AppStack from './Navigation/AppStack';
import AuthStack from './Navigation/AuthStack';

import { navigationRef } from './Navigation/navigationRef';
import NotificationService from './Notifications/notificationService';
import NotificationHandler from './Notifications/NotificationHandler';
import NotificationNavigator from './Notifications/NotificationNavigator';
import { NotificationProvider } from './Notifications/NotificationContext';


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

  // Sync login state whenever it changes
  useEffect(() => {
    NotificationNavigator.setLoginState(isLoggedIn);
  }, [isLoggedIn]);


  // firebase integration link
  useEffect(() => {
    // 1. Request permission, create channels, get FCM token
    NotificationService.init();

    // 2. Register foreground listener
    NotificationHandler.registerForegroundHandler();

    // 3. Listen for token refresh and update backend
    const unsubscribeTokenRefresh = NotificationService.listenForTokenRefresh();

    // Cleanup on unmount
    return () => {
      unsubscribeTokenRefresh();
    };
  }, []);

  // Called once the navigation tree is ready and navigatorRef is populated
  function onNavigationReady() {
    // 4. Pass the global ref into NotificationNavigator
    NotificationNavigator.setNavigator(navigationRef.current);

    // 5. Handle quit state — app opened via notification tap
    NotificationHandler.handleQuitState();
  }

  
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
          {isLoggedIn ? <AppStack setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn}/>}
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}