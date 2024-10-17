import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../Store';

const TaskDetailScreen = () => {
  const route = useRoute();
  const {taskId} = route.params;

  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === taskId),
  );

  if (!task) return <Text style={styles.errorText}>Task not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>
        {task.description || 'No description provided'}
      </Text>
      <Text style={styles.label}>Deadline:</Text>
      <Text style={styles.deadline}>{task.deadline}</Text>
      <Text style={styles.label}>Priority:</Text>
      <Text style={styles.priority}>{task.priority}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.status}>{task.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#181818',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  deadline: {
    fontSize: 16,
    color: '#fff',
  },
  priority: {
    fontSize: 16,
    color: '#FF9800', // Example color for priority
  },
  status: {
    fontSize: 16,
    color: '#4CAF50', // Example color for status
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default TaskDetailScreen;
