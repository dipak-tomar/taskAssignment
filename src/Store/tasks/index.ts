import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {supabase} from '../../config/supabaseClient';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  deadline: string;
}

// Async thunk for fetching tasks from an API
export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const response = await supabase.from('tasks').select('*');
    return response.data;
  },
);

// Async thunk for adding a task
export const addTask = createAsyncThunk<Task, Task>(
  'tasks/addTask',
  async task => {
    const {error} = await supabase
      .from('tasks')
      .upsert([task], {onConflict: ['id']});
    if (error) {
      throw new Error(error.message);
    }

    return task;
  },
);

// Define the initial state interface
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setTasks(state, action: {payload: Task[]}) {
      state.tasks = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add task'; // Handle error on task addition failure
      });
  },
});

export const {setTasks} = taskSlice.actions;
export default taskSlice.reducer;
