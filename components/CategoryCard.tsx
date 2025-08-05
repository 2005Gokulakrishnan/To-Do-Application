import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/contexts/TaskContext';
import { useTasks } from '@/contexts/TaskContext';
import { Folder, Trash2 } from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  showDelete?: boolean;
}

export function CategoryCard({ category, showDelete = false }: CategoryCardProps) {
  const { tasks, deleteCategory } = useTasks();
  const router = useRouter();
  
  const taskCount = tasks.filter(task => task.categoryId === category.id).length;
  const completedCount = tasks.filter(task => task.categoryId === category.id && task.completed).length;

  const handleDelete = () => {
    if (taskCount > 0) {
      Alert.alert(
        'Cannot Delete Category',
        'This category contains tasks. Please move or delete all tasks before deleting the category.'
      );
      return;
    }

    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteCategory(category.id)
        },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { borderLeftColor: category.color }]}
      onPress={() => router.push(`/category-tasks?id=${category.id}&name=${encodeURIComponent(category.name)}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
        <Folder size={24} color={category.color} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{category.name}</Text>
          {showDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.taskCount}>
          {completedCount} of {taskCount} tasks completed
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: taskCount > 0 ? `${(completedCount / taskCount) * 100}%` : '0%',
                backgroundColor: category.color 
              }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    flex: 1,
  },
  taskCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    width: 60,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  deleteButton: {
    padding: 4,
  },
});