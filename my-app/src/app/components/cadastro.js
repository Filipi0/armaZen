"use client"; // Isso garante que o Next.js trate este componente como um Client Component

import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importando ícones do React Icons
import styles from '../styles/Cadastro.module.css'; // Ajuste o caminho conforme necessário

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
                
                {/* Campo de Email com Ícone */}
                <div className={styles.inputGroup}>
                    <FaEnvelope className={styles.icon} />
                    <input
                         type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                
                {/* Campo de Senha com Ícone */}
                <div className={styles.inputGroup}>
                    <FaLock className={styles.icon} />
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
