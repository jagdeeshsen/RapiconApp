import { clearAll, getAuthData, getRefreshToken, saveRefreshToken, updateToken } from './authStorage';

let refreshPromise = null;

const refreshAccessToken = async () => {

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {

    const refreshToken =
      await getRefreshToken();

    if (!refreshToken) {

      await clearAll();

      throw new Error("Session expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      }
    );

    if (!response.ok) {

      await clearAll();

      throw new Error(
        "Refresh token expired"
      );
    }

    const data = await response.json();

    await updateToken(
      data.accessToken
    );

    await saveRefreshToken({
      refreshToken:
        data.refreshToken,
    });

    return data.accessToken;

  })();

  try {

    return await refreshPromise;

  } finally {

    refreshPromise = null;
  }
};

export const authorizedFetch = async (
  url,
  options = {}
) => {

  let authData = await getAuthData();

  let response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        `Bearer ${authData?.token}`,
      "X-User-Id":
        authData?.userId,
      ...options.headers,
    },
  });

  // Token expired
  if (
    response.status === 401 &&
    !options._retry
  ) {

    try {

      const accessToken =
        await refreshAccessToken();

      response = await fetch(url, {
        ...options,
        _retry: true,
        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${accessToken}`,

          "X-User-Id":
            authData?.userId,

          ...options.headers,
        },
      });

    } catch (error) {

      console.log(
        "Refresh token error:",
        error
      );

      throw error;
    }
  }

  return response;
};

/* export const authorizedFetch = async (url, options = {}) => {
  const authData = await getAuthData();

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authData?.token}`,
      'X-User-Id': authData?.userId,
      ...options.headers,
    },
  });
}; */