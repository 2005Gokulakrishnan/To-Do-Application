import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTasks } from '@/contexts/TaskContext';

interface CategorySelectorProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategorySelector({ selectedCategory, onSelectCategory }: CategorySelectorProps) {
  const { categories } = useTasks();

  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              isSelected && { 
                backgroundColor: category.color + '20', 
                borderColor: category.color 
              }
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <View style={[styles.colorDot, { backgroundColor: category.color }]} />
            <Text style={[
              styles.categoryText,
              { color: isSelected ? category.color : '#6B7280' }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    gap: 8,
    minWidth: 100,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
});