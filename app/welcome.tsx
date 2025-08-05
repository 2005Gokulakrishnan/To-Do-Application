import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#4A90E2', '#6BB6FF']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.taskCard}>
            <View style={styles.taskItem} />
            <View style={styles.taskItem} />
            <View style={styles.taskItem} />
          </View>
        </View>
        
        <Text style={styles.title}>TaskFlow</Text>
        <Text style={styles.subtitle}>
          Organize your tasks and boost your productivity
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signUpText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustration: {
    marginBottom: 60,
  },
  taskCard: {
    width: 200,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  taskItem: {
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});