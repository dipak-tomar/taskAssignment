import {StatusBar} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from '../screens/FeedScreen';
import CreatePost from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TaskListScreen from '../screens/TaskList';
import TaskDetailScreen from '../screens/TaskDetails';
import TaskForm from '../screens/TaskForm';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'blue'} />
      <Stack.Navigator
        initialRouteName={'TaskList'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
