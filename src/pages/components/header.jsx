import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/components/header.module.css';

export default function Header() {
  const router = useRouter(); // Hook para navegação

  // Função para redirecionar ao clicar no logout
  const handleLogout = () => {
    router.push('/login'); // Redireciona para a página de login
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>

        {/* LOGO */}
        <h1 className={styles.logo}>
          <Link href='/'>ArmaZen</Link>
        </h1>

        {/* NAVEGAÇÃO - Apenas para telas maiores */}
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/cadastro-itens">Cadastro</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/vizualizar-estoques">Visualização</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/movimentar-estoque">Movimentação</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/login">Log off</Link>
            </li>
          </ul>
        </nav>

        {/* ÍCONE DE LOGOUT - Apenas para telas menores */}
        <div className={styles['logout-icon']} onClick={handleLogout}>
          <Image src="/logout.png" alt="Log off" width={30} height={30} />
        </div>

      </div>
    </header>
  );
}
