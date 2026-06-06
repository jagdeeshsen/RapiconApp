import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNotifications } from './NotificationContext';
import { markNotificationReadAPI } from './NotificationAPI';
import NotificationNavigator from './NotificationNavigator';

export default function NotificationScreen() {
  const {
    notifications,
    loading,
    page,
    totalPages,
    fetchNotifications,
    decrementUnread,
    markAllRead,
  } = useNotifications();

  // Fetch on mount
  useEffect(() => {
    fetchNotifications(1);
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    fetchNotifications(1);
  }, []);

  // Infinite scroll — load next page
  const onEndReached = useCallback(() => {
    if (!loading && page < totalPages) {
      fetchNotifications(page + 1);
    }
  }, [loading, page, totalPages]);

  // Tap a notification item
  const handleNotificationPress = useCallback(async (item) => {
    try {
      // 1. Mark as read on backend if not already
      if (!item.isRead) {
        await markNotificationReadAPI(item._id);
        decrementUnread();
      }

      // 2. Navigate to the relevant screen
      NotificationNavigator.navigate({
        type: item.type,
        entityId: item.entityId,
      });
    } catch (error) {
      console.error('Failed to handle notification press:', error);
    }
  }, [decrementUnread]);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[styles.item, !item.isRead && styles.itemUnread]}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        {/* Unread dot indicator */}
        {!item.isRead && <View style={styles.unreadDot} />}

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {item.body}
          </Text>
          <Text style={styles.time}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [handleNotificationPress]);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No notifications yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header with mark all read */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={loading && page === 1} onRefresh={onRefresh} />
        }
        contentContainerStyle={notifications?.length === 0 && styles.emptyContainer}
      />
    </View>
  );
}

// Format timestamp to relative time
function formatTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  markAllText: {
    fontSize: 14,
    color: '#4A6CF7',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  itemUnread: {
    backgroundColor: '#F0F4FF',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A6CF7',
    marginTop: 6,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginBottom: 3,
  },
  body: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 5,
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  loader: {
    paddingVertical: 16,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
  },
});