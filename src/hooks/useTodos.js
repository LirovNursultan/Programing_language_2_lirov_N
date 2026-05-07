import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo, toggleTodo, updateTodo, deleteTodo, setFilter, setSearchQuery,
} from '../redux/slices/todoSlice';

export function useTodos() {
  const { todos, filter, searchQuery } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const filteredTodos = todos
    .filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return {
    todos,
    filteredTodos,
    filter,
    searchQuery,
    add: (payload) => dispatch(addTodo(payload)),
    toggle: (id) => dispatch(toggleTodo(id)),
    update: (payload) => dispatch(updateTodo(payload)),
    remove: (id) => dispatch(deleteTodo(id)),
    changeFilter: (f) => dispatch(setFilter(f)),
    changeSearch: (q) => dispatch(setSearchQuery(q)),
  };
}
