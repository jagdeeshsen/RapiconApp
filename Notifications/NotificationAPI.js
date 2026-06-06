import { authorizedFetch } from "../utils/apiClient";

const BASE_URL = 'https://rapiconinfra.com';


// ─── FCM token ───────────────────────────────────────────────────────

export async function saveFCMTokenAPI(fcmToken, platform) {
  const response = await authorizedFetch(`${BASE_URL}/api/user/fcm-token`, {
    method: 'POST',
    body: JSON.stringify({ fcmToken, platform }),
  });
  if (!response.ok) throw new Error('Failed to save FCM token');
  return response.json(); 
}

export async function deleteFCMTokenAPI(fcmToken) {
  const response = await authorizedFetch(`${BASE_URL}/api/user/fcm-token`, {
    method:  'DELETE',
    body: JSON.stringify({ fcmToken }),
  });
  if (!response.ok) throw new Error('Failed to delete FCM token');
  return response.json();
}

// ─── Notifications ───────────────────────────────────────────────────

export async function getNotificationsAPI(page = 1, limit = 20) {
  const response = await authorizedFetch(`${BASE_URL}/api/notifications?page=${page - 1}&size=${limit}`, {
    method: 'GET',
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}

export async function markNotificationReadAPI(notificationId) {
  const response = await authorizedFetch(
    `${BASE_URL}/api/notifications/${notificationId}/read`,
    { method: 'PATCH', }
  );
  if (!response.ok) throw new Error('Failed to mark as read');
  return response.json();
}

export async function markAllNotificationsReadAPI() {
  const response = await authorizedFetch(`${BASE_URL}/api/notifications/read-all`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to mark all as read');
  return response.json();
}