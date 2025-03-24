"use client";
import React, { useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/cadastro-usuarios.module.css";
import { registerUser } from "../services/userService";

function CadastroUsuarios() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { email, password, name };

    try {
      const response = await registerUser(userData);
      alert(response.message || "Usuário cadastrado com sucesso!");

      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      alert(error.message || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
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
                <div className={styles.formGroup}>
                  <label htmlFor="password">Senha do Usuário</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome do Usuário</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow2}>
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
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
