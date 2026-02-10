import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          My Redux App
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/counter" 
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                Счётчик (Redux)
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/todo" 
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                TODO List
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/users" 
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                Пользователи (API)
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              >
                О проекте
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;