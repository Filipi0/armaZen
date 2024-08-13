import Link from 'next/link';
import styles from '../../styles/header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
        <h1 className={styles.logo}>
            <Link href='/index'>ArmaZen</Link>
        </h1>
        <nav>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">Cadastro</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">Visualização</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">Movimentação</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">Relatório</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}
