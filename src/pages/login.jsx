"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/auth";
import styles from "../styles/login.module.css";
import Footer from "../pages/components/footer.jsx";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); 
  const router = useRouter();

  // Validação do email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail === "" || isValidEmail(newEmail)) {
      setEmailError("");
    } else {
      setEmailError("Formato de e-mail inválido.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setEmailError("Formato de e-mail inválido.");
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      setError("Tempo limite excedido! O servidor pode estar fora do ar.");
      setLoading(false);
    }, 15000);

    try {
      const result = await login(email, senha);
      clearTimeout(timeout);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
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
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={styles.input}
              disabled={loading}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={styles.input}
              disabled={loading}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          {/* 🔹 Agora o link direciona para a tela de recuperação de senha */}
          <Link href="/esqueci-senha" className={styles.forgotPassword}>
            Esqueci minha senha.
          </Link>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Aguarde..." : "Entrar"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
