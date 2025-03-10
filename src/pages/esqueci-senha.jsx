"use client";

import { useState, useEffect } from "react";
import { forgotPassword } from "../services/userService";
import styles from "../styles/esqueci-senha.module.css";
import Footer from "./components/footer.jsx";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage("");
    setError("");
  }, [email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
    } catch (error) {
      setError(error.message || "Erro ao enviar email de recuperação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Recuperar Senha</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading || !email}>
              {loading ? "Enviando..." : "Enviar Email"}
            </button>
          </form>

          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
