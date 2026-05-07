import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>Финальный проект — React + Redux + RTK Query</p>
      <p className={styles.copyright}>© 2026 | Programming Languages II</p>
      <p className={styles.extra}>JSONPlaceholder · DummyJSON · Redux Toolkit</p>
    </footer>
  );
}
