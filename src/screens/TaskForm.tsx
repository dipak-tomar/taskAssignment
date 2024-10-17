import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // For Deadline Date Picker
import {Picker} from '@react-native-picker/picker'; // For Priority Select Dropdown
import {supabase} from '../config/supabaseClient';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../Store/tasks';
import {useRoute} from '@react-navigation/native';
import {RootState} from '../Store';
import {goBack} from '../Navigators/utils';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date(new Date()));
  const {error} = useSelector((state: RootState) => state.tasks);

  const [priority, setPriority] = useState('Medium'); // Default priority
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle Date Change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(false);
    setDeadline(currentDate);
  };

  const saveTask = async () => {
    if (!title) {
      Alert.alert('Task Title is required');
      return;
    }
    if (deadline <= new Date()) {
      Alert.alert('Deadline should be a future date');
      return;
    }

    const taskData = {
      title,
      description,
      deadline: deadline.toISOString(),
      priority,
      created_at: new Date().toISOString(),
      status: 'Pending',
    };

    dispatch(addTask(taskData));

    if (error) {
      Alert.alert('Error adding task: ' + error);
    } else {
      Alert.alert('Task added successfully!');
      goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>

      {/* Task Title Input */}
      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={title}
        onChangeText={setTitle}
        required
      />

      {/* Description Input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {/* Deadline Date Picker */}
      <Text style={styles.label}>Deadline *</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInput}>
          {deadline ? deadline.toDateString() : 'Select a Deadline'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()} // Only allow future dates
        />
      )}

      {/* Priority Picker */}
      <Text style={styles.label}>Priority *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={itemValue => setPriority(itemValue)}
          mode="dropdown">
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#181818',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    color: '#bbb',
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#303030',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    backgroundColor: '#303030',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#303030',
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#00cc44',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TaskForm;
