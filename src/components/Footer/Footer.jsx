import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        Лабораторная работа №3 — React + Redux + API
      </p>
      <p className={styles.copyright}>
        © 2026 | Tokmok, Programming Languages II
      </p>
      <p className={styles.extra}>
        Данные загружены из JSONPlaceholder и DummyJSON
      </p>
    </footer>
  );
}

export default Footer;