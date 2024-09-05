"use client";

import React, { useState } from "react";
import Footer from "./components/footer.jsx";
import styles from "../styles/recupera-senha.module.css";

export default function RecuperaSenha() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Esqueci minha senha</h2>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="username">Usuário:</label>
              <div className={styles.inputWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#003459"
                  className={styles.icon}
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="newPassword">Nova senha:</label>
              <div className={styles.inputWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#003459"
                  className={styles.icon}
                >
                  <path d="M12 17c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2s-2 .9-2 2v6c0 1.1.9 2 2 2zm7-6h-2V9c0-2.76-2.24-5-5-5S7 6.24 7 9v2H5v10h14V11zm-6 4h-2v-4h2v4z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  className={styles.input}
                  
                />
                <svg
                  onClick={() => setShowPassword(!showPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#003459"
                  className={styles.iconEye}
                >
                  <path d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5S13.93 8.5 12 8.5z" />
                </svg>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="confirmPassword">Confirmar senha:</label>
              <div className={styles.inputWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#003459"
                  className={styles.icon}
                >
                  <path d="M12 17c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2s-2 .9-2 2v6c0 1.1.9 2 2 2zm7-6h-2V9c0-2.76-2.24-5-5-5S7 6.24 7 9v2H5v10h14V11zm-6 4h-2v-4h2v4z" />
                </svg>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.input}
                />
                <svg
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="#003459"
                  className={styles.iconEye}
                >
                  <path d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13c-3.04 0-5.5-2.46-5.5-5.5S8.96 6.5 12 6.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-9c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5S13.93 8.5 12 8.5z" />
                </svg>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>Alterar</button>
            
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
