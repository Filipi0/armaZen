import Link from 'next/link';
import styles from '../../styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p className={styles.text}>Desenvolvido por Filipi Dantas e Maria Luz</p>
    </footer>
  );
}
