import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>⚛️ Redux App</NavLink>

        <nav>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} end>Главная</NavLink></li>
            <li><NavLink to="/counter" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Счётчик</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>О проекте</NavLink></li>
          </ul>
        </nav>

        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.9rem' }}>👤 {user.name}</span>
              <button onClick={() => dispatch(logout())} style={{ padding: '7px 14px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                Выйти
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <NavLink to="/login" style={{ padding: '7px 14px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>Войти</NavLink>
              <NavLink to="/register" style={{ padding: '7px 14px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>Регистрация</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
