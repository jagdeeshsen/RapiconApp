import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { deleteFcmToken, getFcmToken, saveFcmToken } from '../utils/authStorage';
import { saveFCMTokenAPI, deleteFCMTokenAPI } from './NotificationAPI';

const NotificationService = {

  async init() {
    await NotificationService.requestPermission();
    await NotificationService.createChannels();
    await NotificationService.registerToken();
  },

  async requestPermission() {
    const status = await messaging().requestPermission();
    const enabled =
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL;
    if (!enabled) console.warn('Notification permission denied');
  },

  async createChannels() {
    await notifee.createChannel({
      id: 'default',
      name: 'General Notifications',
      importance: AndroidImportance.HIGH,
    });
    await notifee.createChannel({
      id: 'orders',
      name: 'Order Updates',
      importance: AndroidImportance.HIGH,
    });
    await notifee.createChannel({
      id: 'messages',
      name: 'Messages',
      importance: AndroidImportance.HIGH,
    });
  },

  async registerToken() {
    try {
      const newToken    = await messaging().getToken();
      const storedToken = await getFcmToken(); // ← Keychain

      if (newToken !== storedToken) {
        await saveFCMTokenAPI(newToken);
        await saveFcmToken(newToken);                                   // ← Keychain
        console.log('FCM token registered:', newToken);
      }
    } catch (error) {
      console.error('Failed to register FCM token:', error);
    }
  },

  async unregisterToken() {
    try {
      const token = await getFcmToken();        // ← Keychain
      if (token) {
        await deleteFCMTokenAPI(token);
        await deleteFcmToken();                  // ← Keychain
        console.log('FCM token removed');
      }
    } catch (error) {
      console.error('Failed to unregister FCM token:', error);
    }
  },

  listenForTokenRefresh() {
    return messaging().onTokenRefresh(async (newToken) => {
      await saveFCMTokenAPI(newToken);
      await saveFcmToken(newToken);             // ← Keychain
      console.log('FCM token refreshed');
    });
  },
};

export default NotificationService;