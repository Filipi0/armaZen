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
      router.replace('/index'); // Redirecionar para a página de login
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>ArmaZen</h1>
        <div className={styles.buttonContainer}>
          <Link className={styles.Link} href="cadastro-itens">
            <button className={styles.button}>Cadastrar Itens</button>
          </Link>

          <Link className={styles.Link} href="vizualizar-estoques">
          <button className={styles.button}>Movimentar Itens</button>      
          </Link>
          <button className={styles.button}>Relatório</button>
          <button className={styles.button}>Visualizar Estoques</button>
          <button className={styles.button}>Cadastrar Usuários</button>
          <button className={styles.button}>Visualizar Usuários</button>
        </div>

      </div>
      <div className={styles.rightSide}></div>
      <Footer></Footer>
    </div>
  );
}
