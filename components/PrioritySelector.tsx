import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle, Clock } from 'lucide-react-native';

interface PrioritySelectorProps {
  selectedPriority: 'low' | 'medium' | 'high';
  onSelectPriority: (priority: 'low' | 'medium' | 'high') => void;
}

export function PrioritySelector({ selectedPriority, onSelectPriority }: PrioritySelectorProps) {
  const priorities = [
    { key: 'low', label: 'Low', color: '#10B981', icon: Clock },
    { key: 'medium', label: 'Medium', color: '#F59E0B', icon: Clock },
    { key: 'high', label: 'High', color: '#EF4444', icon: AlertCircle },
  ] as const;

  return (
    <View style={styles.container}>
      {priorities.map((priority) => {
        const Icon = priority.icon;
        const isSelected = selectedPriority === priority.key;
        
        return (
          <TouchableOpacity
            key={priority.key}
            style={[
              styles.priorityButton,
              isSelected && { backgroundColor: priority.color + '20', borderColor: priority.color }
            ]}
            onPress={() => onSelectPriority(priority.key)}
          >
            <Icon 
              size={20} 
              color={isSelected ? priority.color : '#6B7280'} 
            />
            <Text style={[
              styles.priorityText,
              { color: isSelected ? priority.color : '#6B7280' }
            ]}>
              {priority.label}
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
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    gap: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
});