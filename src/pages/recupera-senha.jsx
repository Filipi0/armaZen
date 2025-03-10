"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "../services/userService";
import styles from "../styles/recupera-senha.module.css";
import Footer from "./components/footer.jsx";

export default function RecuperaSenha() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage("");
    setError("");
  }, [newPassword, confirmPassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Token inválido ou expirado.");
      return;
    }

    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, newPassword);
      setMessage(response.message);

      // Redirecionar para login após sucesso
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError(error.message || "Erro ao redefinir senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Redefinir Senha</h2>

          {!token ? (
            <p className={styles.errorMessage}>Token inválido ou expirado.</p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="newPassword">
                  Nova Senha:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={styles.input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="confirmPassword">
                  Confirmar Senha:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? "Alterando..." : "Alterar Senha"}
              </button>
            </form>
          )}

          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
