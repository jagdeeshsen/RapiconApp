import React, { createContext, useContext, useState, useCallback } from 'react';
import { getNotificationsAPI, markAllNotificationsReadAPI } from './NotificationAPI';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const result = await getNotificationsAPI(pageNum);
      if (pageNum === 1) {
        setNotifications(result.data);
      } else {
        setNotifications(prev => [...prev, ...result.data]);
      }
      setUnreadCount(result.unreadCount);
      setTotalPages(result.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const decrementUnread = useCallback(() => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllRead = useCallback(async () => {
    try {
      await markAllNotificationsReadAPI();
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all read:', error);
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      unreadCount,
      notifications,
      loading,
      page,
      totalPages,
      fetchNotifications,
      decrementUnread,
      markAllRead,
      setUnreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}