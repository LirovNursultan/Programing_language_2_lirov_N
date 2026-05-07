import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, user, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    return () => clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    await login({ username, password });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Вход в систему</h2>
        <p style={styles.hint}>
          Тест: <strong>admin</strong> / <strong>123456</strong>
        </p>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Логин</label>
          <input
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
            disabled={isLoading}
          />
          <label style={styles.label}>Пароль</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            disabled={isLoading}
          />
          <button style={styles.btn} type="submit" disabled={isLoading}>
            {isLoading ? '⏳ Вход...' : 'Войти'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Нет аккаунта?{' '}
          <Link to="/register" style={{ color: '#667eea' }}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', width: '100%', maxWidth: '420px' },
  title: { textAlign: 'center', marginBottom: '0.5rem', color: '#333' },
  hint: { textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem', background: '#f0f8ff', padding: '8px', borderRadius: '8px' },
  error: { background: '#fff0f0', color: '#c0392b', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #f5c6cb' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  label: { fontWeight: '600', color: '#555', fontSize: '0.9rem' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' },
  btn: { marginTop: '0.5rem', padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
};
