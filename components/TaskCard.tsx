import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Task } from '@/contexts/TaskContext';
import { useTasks } from '@/contexts/TaskContext';
import { Check, Clock, CircleAlert as AlertCircle, Trash2 } from 'lucide-react-native';

interface TaskCardProps {
  task: Task;
  showDelete?: boolean;
}

export function TaskCard({ task, showDelete = false }: TaskCardProps) {
  const { updateTask, deleteTask, categories } = useTasks();
  const router = useRouter();
  
  const category = categories.find(c => c.id === task.categoryId);
  
  const toggleCompleted = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteTask(task.id)
        },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return Clock;
      default: return Clock;
    }
  };

  const PriorityIcon = getPriorityIcon(task.priority);

  return (
    <TouchableOpacity 
      style={[styles.container, task.completed && styles.completedContainer]}
      onPress={() => router.push(`/task-details?id=${task.id}`)}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkedCheckbox]}
        onPress={toggleCompleted}
      >
        {task.completed && <Check size={16} color="white" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <View style={styles.priorityBadge}>
            <PriorityIcon size={12} color={getPriorityColor(task.priority)} />
          </View>
          {showDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Trash2 size={16} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
        
        {task.description && (
          <Text style={[styles.description, task.completed && styles.completedDescription]}>
            {task.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
              <Text style={[styles.categoryText, { color: category.color }]}>
                {category.name}
              </Text>
            </View>
          )}
          
          <Text style={styles.dueDate}>
            {task.dueDate.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedContainer: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkedCheckbox: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  priorityBadge: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  completedDescription: {
    color: '#9CA3AF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dueDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
});