import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from '../features/todoState/list';

export default configureStore({
  reducer: {
    todos: toDoReducer,
  },

});