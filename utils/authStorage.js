import * as Keychain from "react-native-keychain";
import { jwtDecode } from "jwt-decode";

const SERVICE = "rapicon-auth";

export const saveAuthData = async (token, userId, name, phone) => {
  try {
    await Keychain.setGenericPassword(
      "user",
      JSON.stringify({ token, userId, name, phone }),
      { service: SERVICE }
    );
  } catch (error) {
    console.log("Save auth error:", error);
  }
};

export const getAuthData = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: SERVICE });

    if (credentials) {
      return JSON.parse(credentials.password);
    }

    return null;
  } catch (error) {
    console.log("Get auth error:", error);
    return null;
  }
};

export const removeAuthData = async () => {
  try {
    await Keychain.resetGenericPassword({ service: SERVICE });
  } catch (error) {
    console.log("Remove auth error:", error);
  }
};

export const checkToken = async () => {
  try {
    const authData = await getAuthData();

    if (!authData) return null;

    const decoded = jwtDecode(authData.token);

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      await removeAuthData();
      return null;
    }

    return authData;
  } catch (error) {
    console.log("Token check error:", error);
    return null;
  }
};








/* import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";

export const saveAuthData = async (token, userId, name, phone) => {
  await SecureStore.setItemAsync(
    'authData',
    JSON.stringify({ token, userId, name, phone })
  );
};

export const getAuthData = async () => {
  const data = await SecureStore.getItemAsync('authData');

  return data ? JSON.parse(data) : null;
};

export const removeAuthData = async () => {
  await SecureStore.deleteItemAsync('authData');
};

export const checkToken = async () => {
  try {
    const data = await getAuthData();

    if (!data || !data.token) {
      return null;
    }

    const decoded = jwtDecode(data.token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      await removeAuthData();
      return null;
    }

    return data; // token valid
  } catch (error) {
    console.log("Token check error:", error);
    return null;
  }
};
 */