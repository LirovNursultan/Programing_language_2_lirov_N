import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from '../pages/HomePage';
import CounterPage from '../pages/CounterPage';
import AboutPage from '../pages/AboutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TodoDetailPage from '../pages/TodoDetailPage';

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/todo/:id" element={<TodoDetailPage />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
