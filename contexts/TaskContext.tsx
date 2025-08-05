import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Work', color: '#4A90E2' },
  { id: '2', name: 'Personal', color: '#50C878' },
  { id: '3', name: 'Health & Fitness', color: '#FF6B6B' },
  { id: '4', name: 'Shopping', color: '#FFB347' },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, categoriesData] = await Promise.all([
        AsyncStorage.getItem('tasks'),
        AsyncStorage.getItem('categories')
      ]);

      if (tasksData) {
        const parsedTasks = JSON.parse(tasksData).map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
        }));
        setTasks(parsedTasks);
      }

      if (categoriesData) {
        setCategories(JSON.parse(categoriesData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const saveCategories = async (newCategories: Category[]) => {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    const newTasks = [...tasks, newTask];
    await saveTasks(newTasks);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    await saveTasks(newTasks);
  };

  const deleteTask = async (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    await saveTasks(newTasks);
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    
    const newCategories = [...categories, newCategory];
    await saveCategories(newCategories);
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, ...updates } : category
    );
    await saveCategories(newCategories);
  };

  const deleteCategory = async (id: string) => {
    const newCategories = categories.filter(category => category.id !== id);
    await saveCategories(newCategories);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      addTask,
      updateTask,
      deleteTask,
      addCategory,
      updateCategory,
      deleteCategory,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}