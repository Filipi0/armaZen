"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Header from './components/header.jsx';
import styles from '../styles/cadastroItens.module.css';
import Footer from './components/footer.jsx';

function CadastroItens() {
    const [codigo, setCodigo] = useState('');
    const [tipoItem, setTipoItem] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [nomeItem, setNomeItem] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('caixa');
    const [validade, setValidade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoItem = {
            codigo,
            tipoItem,
            fornecedor,
            nomeItem,
            quantidade,
            unidadeMedida,
            validade: validade || '----',
        };

        const estoqueAtual = JSON.parse(localStorage.getItem('estoques')) || [];
        estoqueAtual.push(novoItem);
        localStorage.setItem('estoques', JSON.stringify(estoqueAtual));

        // Limpa o formulário
        setCodigo('');
        setTipoItem('');
        setFornecedor('');
        setNomeItem('');
        setQuantidade('');
        setUnidadeMedida('caixa');
        setValidade('');
        
        alert('Item cadastrado com sucesso!');
    };

    return (
        <div>
            <Header />
            <div>
                <h2 className={styles.h2}>Cadastro de Itens</h2>

                <main className={styles.container}>
                    <section className={styles.formSection}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="codigo">Código</label>
                                    <input 
                                        type="text" 
                                        id="codigo" 
                                        name="codigo"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="tipo-item">Tipo do Item</label>
                                    <input 
                                        type="text" 
                                        id="tipo-item" 
                                        name="tipo-item"
                                        value={tipoItem}
                                        onChange={(e) => setTipoItem(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="fornecedor">Fornecedor</label>
                                    <input 
                                        type="text" 
                                        id="fornecedor" 
                                        name="fornecedor" 
                                        placeholder="Opcional" 
                                        value={fornecedor}
                                        onChange={(e) => setFornecedor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="nome-item">Nome do item</label>
                                    <input 
                                        className={styles.nameItem} 
                                        type="text" 
                                        id="nome-item" 
                                        name="nome-item" 
                                        value={nomeItem}
                                        onChange={(e) => setNomeItem(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <input 
                                        type="text" 
                                        id="quantidade" 
                                        name="quantidade"
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="unidade-medida">Unidade de Medida</label>
                                    <select 
                                        id="unidade-medida" 
                                        name="unidade-medida" 
                                        className={styles.select}
                                        value={unidadeMedida}
                                        onChange={(e) => setUnidadeMedida(e.target.value)}
                                    >
                                        <option value="caixa">Caixa</option>
                                        <option value="unidade">Unidade</option>
                                        <option value="litro">Litro</option>
                                        <option value="metro">Metro</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="validade">Data de Validade</label>
                                    <input 
                                        type="text" 
                                        id="validade" 
                                        name="validade" 
                                        placeholder="Opcional" 
                                        value={validade}
                                        onChange={(e) => setValidade(e.target.value)}
                                    />
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
