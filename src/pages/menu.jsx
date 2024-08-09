import React from 'react';
import styles from '../styles/menu.module.css';

function Menu() {
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
        </div>
    );
}

export default Menu;
