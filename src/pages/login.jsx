"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../services/auth";
import styles from "../styles/login.module.css";
import Footer from "../pages/components/footer.jsx";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); // Garante que o estado inicial é uma string vazia
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Resetar o erro antes de tentar o login

    const result = await login(email, senha);

    if (result.success) {
      router.push("/"); // Redireciona para a dashboard
    } else {
      setError(result.message); // Agora exibe a mensagem de erro corretamente
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftside}>
        <h1 className={styles.title}>ArmaZen</h1>
        <h2 className={styles.subtitle}>Armazenamento com tranquilidade!</h2>
      </div>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.LOGIN}>LOGIN</h1>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.input}
            />
          </div>
          
          {/* Exibir a mensagem de erro em vermelho */}
          {error && <p className={styles.error}>{error}</p>}
          
          <Link href="/recupera-senha" className={styles.forgotPassword}>
            Esqueci minha senha.
          </Link>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}