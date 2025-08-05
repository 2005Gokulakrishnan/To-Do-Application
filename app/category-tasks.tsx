import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '@/contexts/TaskContext';
import { TaskCard } from '@/components/TaskCard';
import { ArrowLeft, Folder } from 'lucide-react-native';

export default function CategoryTasks() {
  const { id, name } = useLocalSearchParams();
  const { tasks, categories } = useTasks();
  const router = useRouter();
  
  const category = categories.find(c => c.id === id);
  const categoryTasks = tasks.filter(task => task.categoryId === id);
  const pendingTasks = categoryTasks.filter(task => !task.completed);
  const completedTasks = categoryTasks.filter(task => task.completed);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#4A90E2" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.categoryHeader}>
            {category && (
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Folder size={20} color={category.color} />
              </View>
            )}
            <Text style={styles.headerTitle}>{decodeURIComponent(name as string)}</Text>
          </View>
          <Text style={styles.taskCount}>
            {categoryTasks.length} task{categoryTasks.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {pendingTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            {pendingTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TaskCard task={task} showDelete={true} />
                <View style={styles.taskMeta}>
                  <Text style={styles.taskTime}>
                    Due: {task.dueDate.toLocaleDateString()} at {task.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            {completedTasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TaskCard task={task} showDelete={true} />
                <View style={styles.taskMeta}>
                  <Text style={styles.taskTime}>
                    Due: {task.dueDate.toLocaleDateString()} at {task.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {categoryTasks.length === 0 && (
          <View style={styles.emptyState}>
            <Folder size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No tasks in this category</Text>
            <Text style={styles.emptySubtitle}>
              Create your first task in this category to get started
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  taskCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  taskItem: {
    marginBottom: 8,
  },
  taskMeta: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  taskTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
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
    paddingHorizontal: 40,
  },
});