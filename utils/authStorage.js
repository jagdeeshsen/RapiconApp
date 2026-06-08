import * as Keychain from "react-native-keychain";
import { jwtDecode } from "jwt-decode";


// All keychain service keys — never hardcode these inline
const KEYS = {
  AUTH_TOKEN:    'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  FCM_TOKEN:     'fcm_token',
  USER_ID:       'user_id',
  FEATURE_FLAGS: 'feature_flags',
  SERVICE: "rapicon-auth"
};

export const saveAuthData = async (token, userId, name, phone) => {
  try {
    await Keychain.setGenericPassword(
      "user",
      JSON.stringify({ token, userId, name, phone }),
      { service: KEYS.SERVICE }
    );
  } catch (error) {
    console.log("Save auth error:", error);
  }
};

export const getAuthData = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: KEYS.SERVICE });

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
    await Keychain.resetGenericPassword({ service: KEYS.SERVICE });
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

// ─── Refresh token ───────────────────────────────────────────
export const saveRefreshToken = async (token) => {
  await Keychain.setGenericPassword('refresh', token, {
    service: KEYS.REFRESH_TOKEN,
  });
};

export const getRefreshToken = async () => {
  const result = await Keychain.getGenericPassword({
    service: KEYS.REFRESH_TOKEN,
  });
  return result ? result.password : null;
};

export const deleteRefreshToken = async () => {
  await Keychain.resetGenericPassword({ service: KEYS.REFRESH_TOKEN });
};

// ─── FCM token ───────────────────────────────────────────────
export const saveFcmToken = async (fcmToken) => {
  await Keychain.setGenericPassword('fcm', fcmToken, {
    service: KEYS.FCM_TOKEN,
  });
};

export const getFcmToken = async () => {
  const result = await Keychain.getGenericPassword({
    service: KEYS.FCM_TOKEN,
  });
  return result ? result.password : null;
};

export const deleteFcmToken = async () => {
  await Keychain.resetGenericPassword({ service: KEYS.FCM_TOKEN });
};

// ─── Feature flags (from silent notification) ────────────────
export const saveFeatureFlags = async (flagsObject) => {
  await Keychain.setGenericPassword('flags', JSON.stringify(flagsObject), {
    service: KEYS.FEATURE_FLAGS,
  });
};

export const getFeatureFlags = async () => {
  const result = await Keychain.getGenericPassword({
    service: KEYS.FEATURE_FLAGS,
  });
  return result ? JSON.parse(result.password) : {};
};

export const clearAll = async () => {
  await Promise.all([
    Keychain.resetGenericPassword({ service: KEYS.SERVICE }),
    Keychain.resetGenericPassword({ service: KEYS.FCM_TOKEN }),
    Keychain.resetGenericPassword({ service: KEYS.REFRESH_TOKEN }),
    Keychain.resetGenericPassword({ service: KEYS.FEATURE_FLAGS }),
  ]);
};

export const updateToken = async (newToken) => {
  try {

    const credentials =
      await Keychain.getGenericPassword({
        service: KEYS.SERVICE,
      });

    if (!credentials) return;

    const existingData =
      JSON.parse(credentials.password);

    const updatedData = {
      ...existingData,
      token: newToken,
    };

    await Keychain.setGenericPassword(
      "user",
      JSON.stringify(updatedData),
      { service: KEYS.SERVICE }
    );

  } catch (error) {
    console.log("Update token error:", error);
  }
};

