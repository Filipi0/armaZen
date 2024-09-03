"use client";
import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/visualizar-usuarios.module.css';

function VisualizarUsuarios() {
  const handleSearch = () => {
    console.log('Pesquisar usuário...');
  };

  const handleDelete = () => {
    console.log('Excluir usuário...');
  };

  // Dados fictícios de usuários
  const usuarios = [
    { nome: 'João Silva', email: 'joao.silva@example.com', permissao: 'Administrador' },
    { nome: 'Maria Oliveira', email: 'maria.oliveira@example.com', permissao: 'Usuário' },
    { nome: 'Pedro Santos', email: 'pedro.santos@example.com', permissao: 'Usuário' },
    { nome: 'Ana Costa', email: 'ana.costa@example.com', permissao: 'Administrador' },
  ];

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Visualizar Usuários</h2>
        <main className={styles.container}>
          <section className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <label htmlFor="search" className={styles.searchLabel}>Pesquisar</label>
              <div className={styles.searchInputContainer}>
                <input type="text" id="search" name="search" placeholder="Digite o nome do usuário..." />
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
                <option value="nome">Nome</option>
                <option value="email">Email</option>
                <option value="permissao">Permissão</option>
              </select>
            </div>
          </section>

          <section className={styles.headerSection}>
            <div className={styles.headerItem}>Nome</div>
            <div className={styles.headerItem}>Email</div>
            <div className={styles.headerItem}>Permissão</div>
          </section>

          <section className={styles.tableSection}>
            <table className={styles.userTable}>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.permissao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className={styles.actionSection}>
            <button type="button" className={styles.btnExcluir} onClick={handleDelete}>
              Excluir Usuário
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default VisualizarUsuarios;
