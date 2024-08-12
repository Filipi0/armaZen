import Link from 'next/link';
import styles from '../../styles/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
 
        <nav>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">Cadastro</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about">Visualização</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/contact">Movimentação</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/contact">Relatório</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}
