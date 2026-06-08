import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import NotificationNavigator from './NotificationNavigator';

let _incrementUnread = null;

export function setUnreadIncrementer(fn) {
  _incrementUnread = fn;
}

const NotificationHandler = {

  // ─────────────────────────────────────────────
  // FOREGROUND — app is open and visible
  // Firebase does NOT auto-show a banner here.
  // You must manually display it using notifee.
  // ─────────────────────────────────────────────
  registerForegroundHandler() {
    messaging().onMessage(async (remoteMessage) => {
      const data = remoteMessage.data;

      // Silent — no banner, just background work
      if (data.silent === 'true') {
        await handleSilentNotification(data);
        return;
      }

      await notifee.displayNotification({
        title: data.title,
        body:  data.body,
        android: {
          channelId:   data.channelId || 'default',
          pressAction: { id: 'default' },
        },
        ios: { sound: 'default' },
        data,
      });

      if (_incrementUnread) _incrementUnread();
    });

    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        NotificationNavigator.navigate(detail.notification?.data);
      }
    });
  },

  // ─────────────────────────────────────────────
  // BACKGROUND — app is open but not visible
  // These MUST be registered in index.js
  // before AppRegistry.registerComponent()
  // ─────────────────────────────────────────────
  registerBackgroundHandler() {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const data = remoteMessage.data;
      if (data.silent === 'true') {
        await handleSilentNotification(data);
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        NotificationNavigator.navigate(detail.notification?.data);
      }
    });
  },

  // ─────────────────────────────────────────────
  // QUIT / KILLED — app was fully closed
  // User tapped a notification to open the app.
  // Call this AFTER NavigationContainer is ready.
  // ─────────────────────────────────────────────
  async handleQuitState() {
    const remoteMessage = await messaging().getInitialNotification();

    if (remoteMessage) {
      console.log('App opened from quit state via notification');
      const data = remoteMessage.data;

      // Small delay to ensure navigation tree is mounted
      setTimeout(() => {
        NotificationNavigator.navigate(data);
      }, 500);
    }
  },
};

// Handles silent / data-only notifications — saves to Keychain
async function handleSilentNotification(data) {
  switch (data.type) {
    case 'sync':
      // Trigger a data refresh — no UI update
      console.log('Background sync triggered for:', data.syncTarget);
      break;

    case 'config':
      // Save feature flags securely to Keychain
      if (data.featureFlags) {
        const flags = JSON.parse(data.featureFlags);
        await KeychainService.saveFeatureFlags(flags);           // ← Keychain
        console.log('Feature flags updated:', flags);
      }
      break;

    default:
      console.log('Unknown silent notification type:', data.type);
  }
}

export default NotificationHandler;