import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import styles from './Header.module.css';

function Header() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          My Redux App
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Главная</NavLink></li>
            <li><NavLink to="/counter" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Счётчик</NavLink></li>
            <li><NavLink to="/#todo-section" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>TODO List</NavLink></li>
            <li><NavLink to="/#users-section" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Пользователи</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>О проекте</NavLink></li>
          </ul>
        </nav>

        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span>👤 {user.name}</span>
              <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Выйти
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <NavLink to="/login" style={{ padding: '8px 16px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
                Войти
              </NavLink>
              <NavLink to="/register" style={{ padding: '8px 16px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '6px' }}>
                Регистрация
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;