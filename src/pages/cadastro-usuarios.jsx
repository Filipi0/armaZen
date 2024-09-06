"use client";
import React, { useState } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/cadastro-usuarios.module.css';

function CadastroUsuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [permissao, setPermissao] = useState('usuario');
  const [estado, setEstado] = useState('Piauí');
  const [municipio, setMunicipio] = useState('Picos');
  const [instituicao, setInstituicao] = useState('');

  // Função para salvar o usuário no LocalStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const novoUsuario = { nome, email, senha, permissao, estado, municipio, instituicao };
    
    // Obter a lista de usuários do LocalStorage ou criar uma nova lista
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Adicionar o novo usuário
    const usuariosAtualizados = [...usuariosExistentes, novoUsuario];

    // Salvar os usuários atualizados no LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));

    // Limpar o formulário após o cadastro
    setNome('');
    setEmail('');
    setSenha('');
    setPermissao('usuario');
    setEstado('Piauí');
    setMunicipio('Picos');
    setInstituicao('');

    alert('Usuário cadastrado com sucesso!');
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Cadastro de Usuários</h2>
        <main className={styles.container}>
          <section className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome do Usuário</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className={styles.nameItem}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email do Usuário</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                  <label htmlFor="senha">Senha do Usuário</label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                  <label htmlFor="permissao">Permissão</label>
                  <select
                    id="permissao"
                    name="permissao"
                    className={styles.select}
                    value={permissao}
                    onChange={(e) => setPermissao(e.target.value)}
                  >
                    <option value="administrador">Administrador</option>
                    <option value="usuario">Usuário</option>
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                  <label htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    className={styles.select}
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="Piauí">Piauí</option>
                    {/* Adicione outros estados aqui */}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="municipio">Município</label>
                  <select
                    id="municipio"
                    name="municipio"
                    className={styles.select}
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                  >
                    <option value="Picos">Picos</option>
                    {/* Adicione outros municípios aqui */}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="instituicao">Instituição/Empresa</label>
                  <input
                    type="text"
                    id="instituicao"
                    name="instituicao"
                    value={instituicao}
                    onChange={(e) => setInstituicao(e.target.value)}
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

export default CadastroUsuarios;
