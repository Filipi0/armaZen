"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const usuario = {
            email,
            senha
        };

        console.log('Dados do usuário:', usuario);

        window.location.href = 'http://www.google.com.br';
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.LOGIN}>LOGIN</h1>
                
                    <div className={styles.inputGroup}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <FontAwesomeIcon icon={faLock} className={styles.icon} />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <a href="#" className={styles.forgotPassword}>Esqueci minha senha.</a>
                    <button type="submit" className={styles.button}>Entrar</button>
                </form>
            </div>
        </div>
    );
}

