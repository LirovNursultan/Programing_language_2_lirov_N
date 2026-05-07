import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, isLoading, error, user, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => { return () => clearError(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!name.trim() || !username.trim() || !password.trim()) {
      return setLocalError('Заполните все поля');
    }
    if (password !== confirm) {
      return setLocalError('Пароли не совпадают');
    }
    if (password.length < 4) {
      return setLocalError('Пароль должен быть не менее 4 символов');
    }
    await register({ name, username, password });
  };

  const displayError = localError || error;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Регистрация</h2>

        {displayError && <div style={styles.error}>⚠️ {displayError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Имя</label>
          <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" disabled={isLoading} />
          <label style={styles.label}>Логин</label>
          <input style={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Придумайте логин" disabled={isLoading} />
          <label style={styles.label}>Пароль</label>
          <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Придумайте пароль" disabled={isLoading} />
          <label style={styles.label}>Повторите пароль</label>
          <input style={styles.input} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Повторите пароль" disabled={isLoading} />
          <button style={styles.btn} type="submit" disabled={isLoading}>
            {isLoading ? '⏳ Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{ color: '#667eea' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', width: '100%', maxWidth: '420px' },
  title: { textAlign: 'center', marginBottom: '1rem', color: '#333' },
  error: { background: '#fff0f0', color: '#c0392b', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #f5c6cb' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  label: { fontWeight: '600', color: '#555', fontSize: '0.9rem' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' },
  btn: { marginTop: '0.5rem', padding: '12px', background: 'linear-gradient(135deg, #28a745, #20c997)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
};
