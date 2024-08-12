import React from 'react';
import styles from '../styles/menu.module.css';
import Header from './components/header.jsx';

export default function Menu() {
    return (
        <div className={styles.container}>
            <Header></Header>
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
        </div>
    );
}
