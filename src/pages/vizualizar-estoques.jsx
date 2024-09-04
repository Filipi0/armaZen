"use client";

import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/vizualizar-estoques.module.css';

function VisualizarEstoques() {
  const handleSearch = () => {
    console.log('Pesquisar estoque...');
  };

  const handleDelete = () => {
    console.log('Excluir estoque...');
  };

  // Dados fictícios de estoques
  const estoques = [
    { codigo: '00002', nomeItem: 'Papel Ofício', fornecedor: 'Suprimentos', unidade: 'Resma', quantidade: 2, validade: '----' },
    { codigo: '00005', nomeItem: 'Pó de Café', fornecedor: 'Atacadão', unidade: 'Pacote', quantidade: 3, validade: '25/01/2025' },
    { codigo: '00009', nomeItem: 'Lâmpada 15W', fornecedor: 'Engipec', unidade: 'Unidade', quantidade: 1, validade: '----' },
    { codigo: '00011', nomeItem: 'Refil para Grampeador', fornecedor: '----', unidade: 'Caixa', quantidade: 4, validade: '----' },
    { codigo: '00015', nomeItem: 'Copos Descartáveis 100 uni', fornecedor: '----', unidade: 'Pacote', quantidade: 0, validade: '----' }
  ];

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Visualizar Estoques</h2>
        <main className={styles.container}>
          <section className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <label htmlFor="search" className={styles.searchLabel}>Pesquisar</label>
              <div className={styles.searchInputContainer}>
                <input type="text" id="search" name="search" />
                <button type="button" className={styles.searchIcon} onClick={handleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#00a7e1">
                    <path d="M796 1006 558 768q-33 28-74 42t-84 14q-130 0-220-90T90 514q0-130 90-220t220-90q130 0 220 90t90 220q0 44-14 84t-42 74l238 238-96 96ZM400 722q83 0 141.5-58.5T600 522q0-83-58.5-141.5T400 322q-83 0-141.5 58.5T200 522q0 83 58.5 141.5T400 722Z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <label htmlFor="filter" className={styles.filterLabel}>Filtrar por</label>
              <select id="filter" name="filter" className={styles.filterSelect}>
                <option value="nome">Nome do item</option>
                <option value="codigo">Código</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="unidade">Unidade de Medida</option>
                <option value="quantidade">Quantidade</option>
                <option value="validade">Data de Validade</option>
              </select>
            </div>
          </section>

          <section className={styles.headerSection}>
            <div className={styles.headerItem}>Código</div>
            <div className={styles.headerItem}>Nome do item</div>
            <div className={styles.headerItem}>Fornecedor</div>
            <div className={styles.headerItem}>Uni. Medida</div>
            <div className={styles.headerItem}>Qtd</div>
            <div className={styles.headerItem}>Data de validade</div>
          </section>

          <section className={styles.tableSection}>
            <table className={styles.userTable}>
              <tbody>
                {estoques.map((estoque, index) => (
                  <tr key={index}>
                    <td>{estoque.codigo}</td>
                    <td>{estoque.nomeItem}</td>
                    <td>{estoque.fornecedor}</td>
                    <td>{estoque.unidade}</td>
                    <td>{estoque.quantidade}</td>
                    <td>{estoque.validade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className={styles.actionSection}>
            <button type="button" className={styles.btnExcluir} onClick={handleDelete}>
              Excluir Estoque
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default VisualizarEstoques;
