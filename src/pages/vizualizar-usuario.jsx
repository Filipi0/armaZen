"use client";
import React, { useState, useEffect } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/visualizar-usuarios.module.css';

function VisualizarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Para armazenar o usuário selecionado

  // Carregar os usuários do LocalStorage quando o componente for montado
  useEffect(() => {
    const usuariosLocalStorage = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosLocalStorage);
  }, []);

  const handleSearch = () => {
    console.log('Pesquisar usuário...');
  };

  const handleDelete = () => {
    if (selectedUsuario) {
      const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário ${selectedUsuario.nome}?`);
      if (confirmDelete) {
        // Filtrar os usuários removendo o selecionado
        const usuariosAtualizados = usuarios.filter(usuario => usuario.email !== selectedUsuario.email);
        setUsuarios(usuariosAtualizados);
        localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
        setSelectedUsuario(null); // Limpar a seleção após a exclusão
      }
    } else {
      alert("Selecione um usuário para excluir.");
    }
  };

  const handleRowClick = (usuario) => {
    setSelectedUsuario(usuario); // Selecionar o usuário ao clicar na linha
  };

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
                <input type="text" id="search" name="search" />
                <button type="button" className={styles.searchIcon} onClick={handleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="#00a7e1">
                    <path d="M796 1006 558 768q-33 28-74 42t-84 14q-130 0-220-90T90 514q0-130 90-220t220-90q130 0 220 90t90 220q0 44-14 84t-42 74l238 238-96 96ZM400 722q83 0 141.5-58.5T600 522q0-83-58.5-141.5T400 322q-83 0-141.5 58.5T200 522q0 83 58.5 141.5T400 722Z" />
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
            <div className={styles.headerItem1}>Nome</div>
            <div className={styles.headerItem2}>Email do usuário</div>
            <div className={styles.headerItem3}>Permissão</div>
          </section>

          <section className={styles.tableSection}>
            <table className={styles.userTable}>
              <tbody>
                {usuarios.map((usuario, index) => (
                 <tr
                 key={index}
                 className={usuario === selectedUsuario ? 'selectedRow' : ''}
                 onClick={() => handleRowClick(usuario)} 
               >
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
