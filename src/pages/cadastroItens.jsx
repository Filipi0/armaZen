"use client";
import React from 'react';
import Link from 'next/link';
import Header from './components/header.jsx';
import styles from '../styles/cadastroItens.module.css';
import Footer from './components/footer.jsx';

function CadastroItens() {
    return (
        <div>
            <Header />
            <div>
                <h2 className={styles.h2}>Cadastro de Itens</h2>

                <main className={styles.container}>
                    <section className={styles.formSection}>
                        <form>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="codigo">Código</label>
                                    <input type="text" id="codigo" name="codigo" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="tipo-item">Tipo do Item</label>
                                    <input type="text" id="tipo-item" name="tipo-item" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="fornecedor">Fornecedor</label>
                                    <input type="text" id="fornecedor" name="fornecedor" placeholder="Opcional" />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="nome-item">Nome do item</label>
                                    <input className={styles.nameItem} type="text" id="nome-item" name="nome-item" />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <input type="text" id="quantidade" name="quantidade" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="unidade-medida">Unidade de Medida</label>
                                    <select id="unidade-medida" name="unidade-medida" className={styles.select}>
                                        <option value="caixa">Caixa</option>
                                        <option value="unidade">Unidade</option>
                                        <option value="litro">Litro</option>
                                        <option value="metro">Metro</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="validade">Data de Validade</label>
                                    <input type="text" id="validade" name="validade" placeholder="Opcional" />
                                </div>
                            </div>
                            <div className={styles.formRow2}>
                                <button type="submit" className={styles.btn}>Cadastrar</button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default CadastroItens;
