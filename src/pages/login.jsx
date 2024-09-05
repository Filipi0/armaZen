"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/login.module.css';
import Footer from './components/footer.jsx';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter(); // Inicialize o hook do router
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('authenticated', 'true');
            router.push('/'); // Redirecionar para a página principal
        } else {
            setError(data.message);
        }
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftside}>
                <h1 className={styles.title}>ArmaZen</h1>
                <h2 className={styles.subtitle}>Armazenamento com tranquilidade</h2>
            </div>
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Link className={styles.link1} href="recupera-senha">
                    <button className={styles.forgotPassword}>Esqueci minha senha.</button>
                    </Link>
                    <button type="submit" className={styles.button}>Entrar</button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}
