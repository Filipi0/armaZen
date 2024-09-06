"use client";

import React, { useState, useEffect } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/vizualizar-estoques.module.css';

function VisualizarEstoques() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('nome');
  const [estoques, setEstoques] = useState([]);

  useEffect(() => {
    // Carregar os itens do LocalStorage ao montar o componente
    const estoquesLocalStorage = JSON.parse(localStorage.getItem('estoques')) || [];
    setEstoques(estoquesLocalStorage);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Função para filtrar os estoques
  const filteredEstoques = estoques.filter((estoque) => {
    if (filter === 'nome') {
      return estoque.nomeItem.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'codigo') {
      return estoque.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'fornecedor') {
      return estoque.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'unidade') {
      return estoque.unidade.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'quantidade') {
      return estoque.quantidade.toString().includes(searchTerm);
    } else if (filter === 'validade') {
      return estoque.validade.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

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
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button type="button" className={styles.searchIcon} onClick={() => console.log('Pesquisando')}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#00a7e1">
                    <path d="M796 1006 558 768q-33 28-74 42t-84 14q-130 0-220-90T90 514q0-130 90-220t220-90q130 0 220 90t90 220q0 44-14 84t-42 74l238 238-96 96ZM400 722q83 0 141.5-58.5T600 522q0-83-58.5-141.5T400 322q-83 0-141.5 58.5T200 522q0 83 58.5 141.5T400 722Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="filter" className={styles.filterLabel2}>Filtrar por</label>
              <select
                id="filter"
                name="filter"
                className={styles.filterSelect}
                value={filter}
                onChange={handleFilterChange}
              >
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
            <div className={styles.headerItem1}>Código</div>
            <div className={styles.headerItem2}>Nome do item</div>
            <div className={styles.headerItem3}>Fornecedor</div>
            <div className={styles.headerItem4}>Uni. Medida</div>
            <div className={styles.headerItem5}>Qtd</div>
            <div className={styles.headerItem6}>Data de validade</div>
          </section>

          <section className={styles.tableSection}>
            <table className={styles.userTable}>
              <tbody>
                {filteredEstoques.map((estoque, index) => (
                  <tr key={index}>
                    <td>{estoque.codigo}</td>
                    <td>{estoque.nomeItem}</td>
                    <td>{estoque.fornecedor}</td>
                    <td>{estoque.unidadeMedida}</td>
                    <td>{estoque.quantidade}</td>
                    <td>{estoque.validade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default VisualizarEstoques;
