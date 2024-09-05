"use client";

import React, { useState } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/movimentar-estoque.module.css';

export default function MovimentarEstoque() {
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
                                <path d="M796 1006 558 768q-33 28-74 42t-84 14q-130 0-220-90T90 514q0-130 90-220t220-90q130 0 220 90t90 220q0 44-14 84t-42 74l238 238-96 96ZM400 722q83 0 141.5-58.5T600 522q0-83-58.5-141.5T400 322q-83 0-141.5 58.5T200 522q0 83 58.5 141.5T400 722Z"/>
                            </svg>
                        </button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
