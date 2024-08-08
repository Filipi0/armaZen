"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/cadastro.module.css';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const usuario = {
            nome,
            email,
            senha
        };

        console.log('Dados do usuário:', usuario);

        window.location.href = 'http://www.google.com.br';
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>ArmaZen</h1>
                <p>Armazenamento com tranquilidade</p>
                <p className = {styles.bemVindo}>Seja bem-vindo de volta!</p>
                <p>Acesse sua conta agora mesmo!</p>
                <button className={styles.btn}>ENTRAR</button>
            </div>
            <div className={styles.rightSide}>
                <h2>Crie sua conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FontAwesomeIcon icon={faLock} className={styles.icon} />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.btn}>CADASTRAR</button>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
