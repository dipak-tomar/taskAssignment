import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {supabase} from '../config/supabaseClient';
import {useIsFocused} from '@react-navigation/native';
import {addTasks, fetchTasks} from '../Store/tasks';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '../Navigators/utils';
import {RootState} from '../Store';

const TaskListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  // const [tasks, settasks] = useState([]);
  // const [loading, setloading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const {tasks, loading, error} = useSelector(
    (state: RootState) => state.tasks,
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, isFocused]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || task.status === filter; // Check filter

    return matchesSearch && matchesFilter;
  });

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        {
          backgroundColor:
            item.priority === 'High'
              ? '#ffed8b'
              : item.priority === 'Medium'
              ? '#f0f0f0'
              : '#e0e0e0',
        },
      ]}
      onPress={() => navigate('TaskDetail', {taskId: item.id})}>
      <View style={styles.taskCardContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskDate}>{item.deadline}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log('tasks', tasks);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Morning, User!</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filter === status && styles.activeFilterButton, // Highlight active filter
            ]}
            onPress={() => setFilter(status)}>
            <Text
              style={[
                styles.filterText,
                filter === status && styles.activeFilterText, // Highlight active filter text
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Add Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('TaskForm', {})}>
        <Icon name="add-outline" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#181818',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#404040',
  },
  activeFilterButton: {
    backgroundColor: '#00cc44', // Highlight color for the active filter
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#303030',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    padding: 15,
    minHeight: 150,
  },
  taskCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDescription: {
    color: '#000',
    fontSize: 14,
    marginVertical: 5,
  },
  taskDate: {
    color: '#666',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00cc44',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TaskListScreen;
