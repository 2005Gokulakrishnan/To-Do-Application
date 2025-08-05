import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function Notifications() {
  const router = useRouter();

  const notifications = [
    {
      id: '1',
      type: 'reminder',
      title: 'Task Due Soon',
      message: 'Complete project presentation is due in 2 hours',
      time: '2 hours ago',
      read: false,
      icon: Clock,
      color: '#F59E0B',
    },
    {
      id: '2',
      type: 'completed',
      title: 'Task Completed',
      message: 'You completed "Review design mockups"',
      time: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: '#10B981',
    },
    {
      id: '3',
      type: 'overdue',
      title: 'Task Overdue',
      message: 'Update website content is now overdue',
      time: '2 days ago',
      read: false,
      icon: AlertCircle,
      color: '#EF4444',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <TouchableOpacity
              key={notification.id}
              style={[styles.notificationItem, !notification.read && styles.unreadItem]}
            >
              <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
                <IconComponent size={20} color={notification.color} />
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              
              {!notification.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          );
        })}

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! Notifications will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  markAllRead: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadItem: {
    backgroundColor: '#F8FAFC',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginLeft: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});