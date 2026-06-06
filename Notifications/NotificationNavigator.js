let navigatorRef = null;
let pendingNavigation = null; // holds navigation intent if user isn't logged in
let isUserLoggedIn = false;

const NotificationNavigator = {

  setNavigator(ref) {
    navigatorRef = ref;
  },

  // Call this from App.js whenever isLoggedIn changes
  setLoginState(loggedIn) {
    isUserLoggedIn = loggedIn;

    // If user just logged in and there's a pending navigation, fire it now
    if (loggedIn && pendingNavigation) {
      const data = pendingNavigation;
      pendingNavigation = null;
      setTimeout(() => NotificationNavigator.navigate(data), 300);
    }
  },

  navigate(data) {
    if (!data) return;

    if (!navigatorRef || !navigatorRef.isReady()) {
      setTimeout(() => NotificationNavigator.navigate(data), 300);
      return;
    }

    // If user is not logged in, hold the navigation intent
    if (!isUserLoggedIn) {
      console.log('User not logged in — storing pending navigation');
      pendingNavigation = data;
      return;
    }

    const { type, entityId } = data;

    switch (type) {
      case 'order_placed':
      case 'order_completed':
      case 'payment_success':
        navigatorRef.navigate('Account', { screen: 'My Order' });
        break;
      case 'message':
        navigatorRef.navigate('Account', { screen: 'Notification' });
        break;
      case 'alert':
        navigatorRef.navigate('Account'); 
        break;
      default:
        navigatorRef.navigate('Home');
        break;
    }
  },
};

export default NotificationNavigator;