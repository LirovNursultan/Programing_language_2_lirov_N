import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, title: 'Выучить Redux Toolkit', completed: true, description: 'Изучить основы, слайсы и работу с селекторами' },
    { id: 2, title: 'Сделать лабораторную по Todo', completed: false, description: 'Реализовать CRUD и детальный просмотр' },
    { id: 3, title: 'Подготовить отчёт', completed: false, description: 'Описать проделанную работу в документе' },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
  searchQuery: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) { todo.title = title; todo.description = description; }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => { state.filter = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
  },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo, setFilter, setSearchQuery } = todoSlice.actions;
export default todoSlice.reducer;
