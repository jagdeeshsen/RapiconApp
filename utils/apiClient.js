import { getAuthData } from './authStorage';

export const authorizedFetch = async (url, options = {}) => {
  const authData = await getAuthData();

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authData?.token}`,
      ...options.headers,
    },
  });
};




/* import { getAuthData } from './authStorage';

export const authorizedFetch = async (url, options = {}) => {
  const authData = await getAuthData();

  const token = authData?.token;

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
}; */
