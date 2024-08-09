import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
        <h1>
            <Link href="./src/pages/index.jsx">ArmaZen</Link>
        </h1>
        <nav>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/">Cadastro</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about">Vizualização</Link>
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
