"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/index.module.css';
import Footer from './components/footer.jsx';

export default function Menu() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');

    if (isAuthenticated !== 'true') {
      router.replace('/login'); // Redireciona para a página de login
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>ArmaZen</h1>
        <div className={styles.buttonContainer}>
          
          <Link href="/cadastro-itens" className={styles.link}>
            <button className={styles.button}>Cadastrar Itens</button>
          </Link>

          <Link href="/vizualizar-estoques" className={styles.link}>
            <button className={styles.button}>Movimentar Itens</button>
          </Link>

          <Link href="/vizualizar-estoques" className={styles.link}>
            <button className={styles.button}>Visualizar Estoques</button>
          </Link>

          <Link href="/cadastro-usuarios" className={styles.link}>
            <button className={styles.button}>Cadastrar Usuários</button>
          </Link>

          <Link href="/vizualizar-usuario" className={styles.link}>
            <button className={styles.button}>Visualizar Usuários</button>
          </Link>

          <button className={styles.button}>Relatório</button>
        </div>

      </div>
      <div className={styles.rightSide}></div>
      <Footer />
    </div>
  );
}
