"use client";

import { useState } from 'react';
import styles from '../styles/Cadastro.module.css';

function Cadastro() {
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
                
                <button type="submit" className={styles.button}>Entrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
