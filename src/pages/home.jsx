"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/menu.module.css';
import Footer from './components/footer.jsx';

export default function Menu() {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authenticated');
        console.log('Valor de authenticated no home:', isAuthenticated);
      if (!isAuthenticated) {
        console.log('Usuário não autenticado, redirecionando para /login...');
        router.push('/login');
      }else{
        console.log('Usuário autenticado, continuando para /home...');
      }

    }, [router]);
    
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1 className={styles.title}>ArmaZen</h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Cadastrar Itens</button>
                    <button className={styles.button}>Movimentar Itens</button>
                    <button className={styles.button}>Relatório</button>
                    <button className={styles.button}>Visualizar Estoques</button>
                    <button className={styles.button5}>Cadastrar Usuários</button>
                </div>
            </div>
            <div className={styles.rightSide}></div>
            <Footer />
        </div>
    );
}
