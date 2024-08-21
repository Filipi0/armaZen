"use client";
import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/cadastro-usuarios.module.css';

function CadastroUsuarios() {
  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Cadastro de Usuários</h2>
        <main className={styles.container}>
          <section className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome do Usuário</label>
                <input type="text" id="nome" name="nome" className={styles.nameItem} />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email do Usuário</label>
                <input type="email" id="email" name="email" />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                <label htmlFor="senha">Senha do Usuário</label>
                <input type="password" id="senha" name="senha" />
              </div>
              <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                <label htmlFor="permissao">Permissão</label>
                <select id="permissao" name="permissao" className={styles.select}>
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuário</option>
                </select>
              </div>
              <div className={`${styles.formGroup} ${styles.senhaPermissaoEstado}`}>
                <label htmlFor="estado">Estado</label>
                <select id="estado" name="estado" className={styles.select}>
                  <option value="Piauí">Piauí</option>
                  {/* outros estados */}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="municipio">Município</label>
                <select id="municipio" name="municipio" className={styles.select}>
                  <option value="Picos">Picos</option>
                  {/*outros municípios */}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="instituicao">Instituição</label>
                <input type="text" id="instituicao" name="instituicao" />
              </div>
            </div>
            <div className={styles.formRow2}>
              <button type="submit" className={styles.btn}>Cadastrar</button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default CadastroUsuarios;