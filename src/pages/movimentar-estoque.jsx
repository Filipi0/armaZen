"use client";

import React, { useState } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/movimentar-estoque.module.css';

export default function MovimentarEstoque() {
    const [quantity, setQuantity] = useState(1);

    // Função para incrementar o valor
    const handleIncrement = () => {
        if (quantity < 100) setQuantity(quantity + 1);
    };

    // Função para decrementar o valor
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <>
            <Header />
            <h2 className={styles.h2}>Movimentar Estoques</h2>
            <div className={styles.container}>
                <section className={styles.searchSection}>
                    <label htmlFor="search" className={styles.searchLabel}>Pesquisa</label>
                    <div className={styles.searchInputContainer}>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Item que sofrerá alteração na quantidade"
                            className={styles.searchInput}
                        />
                        <button type="button" className={styles.searchIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#00a7e1">
                                <path d="M796 1006 558 768q-33 28-74 42t-84 14q-130 0-220-90T90 514q0-130 90-220t220-90q130 0 220 90t90 220q0 44-14 84t-42 74l238 238-96 96ZM400 722q83 0 141.5-58.5T600 522q0-83-58.5-141.5T400 322q-83 0-141.5 58.5T200 522q0 83 58.5 141.5T400 722Z" />
                            </svg>
                        </button>
                    </div>

                    <label htmlFor="quantity" className={styles.searchLabel2}>Quantidade de Movimentação</label>

                    <div className={styles.containerInput}>
                        <svg
                            className={styles.decrement}
                            width="19"
                            height="17"
                            viewBox="0 0 19 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleDecrement} /* Decrementa o valor ao clicar */
                        >
                            <path d="M11.2321 16C10.4623 17.3333 8.53775 17.3333 7.76795 16L0.406734 3.25C-0.363066 1.91667 0.599184 0.25 2.13878 0.25L16.8612 0.25C18.4008 0.25 19.3631 1.91667 18.5933 3.25L11.2321 16Z" fill="#00A7E1" />
                        </svg>

                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max="100"
                            value={quantity}
                            step="1"
                            className={styles.searchInput2}
                            readOnly
                        />

                        <svg
                            className={styles.increment}
                            width="19"
                            height="17"
                            viewBox="0 0 19 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleIncrement} /* Incrementa o valor ao clicar */
                        >
                            <path d="M7.76795 1C8.53775 -0.333333 10.4623 -0.333333 11.2321 1L18.5933 13.75C19.3631 15.0833 18.4008 16.75 16.8612 16.75H2.13878C0.599184 16.75 -0.363067 15.0833 0.406733 13.75L7.76795 1Z" fill="#00A7E1" />
                        </svg>
                    </div>

                    {/* Botões abaixo dos inputs */}
                    <div className={styles.buttonGroup}>
                        <button type="button" className={`${styles.button} ${styles.cancel}`}>Cancelar operação</button>
                        <button type="button" className={styles.button}>Retirar</button>
                        <button type="button" className={styles.button}>Adicionar</button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
