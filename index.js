/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotificationHandler from './Notifications/NotificationHandler';

// ⚠️ Background handlers MUST be registered here,
// BEFORE AppRegistry.registerComponent()
// Firebase requires this at the module level.
NotificationHandler.registerBackgroundHandler();


AppRegistry.registerComponent(appName, () => App);
