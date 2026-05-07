// useAuth — удобный доступ к auth состоянию
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout, clearError } from '../redux/slices/authSlice';

export function useAuth() {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    user,
    isLoading,
    error,
    login: (credentials) => dispatch(loginUser(credentials)),
    register: (data) => dispatch(registerUser(data)),
    logoutUser: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
}
