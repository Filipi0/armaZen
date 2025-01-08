"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import styles from '../styles/sidebar.module.css';

export default function Sidebar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`${styles.sidebar} ${isMenuOpen ? styles.menuOpen : ""}`}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className={styles.menuLinks}>
        <Link href="/cadastro-itens" className={styles.link}>
          <Image
            src="/icons/box.png"
            alt="Cadastrar Itens"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Cadastrar Itens</span>}
        </Link>

        <Link href="/movimentar-estoque" className={styles.link}>
          <Image
            src="/icons/clipboard.png"
            alt="Movimentar Itens"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Movimentar Itens</span>}
        </Link>

        <Link href="/vizualizar-estoques" className={styles.link}>
          <Image
            src="/icons/box.png"
            alt="Visualizar Estoques"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Visualizar Estoques</span>}
        </Link>

        <Link href="/cadastro-usuarios" className={styles.link}>
          <Image
            src="/icons/users.png"
            alt="Cadastrar Usuários"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Cadastrar Usuários</span>}
        </Link>

        <Link href="/vizualizar-usuario" className={styles.link}>
          <Image
            src="/icons/users.png"
            alt="Visualizar Usuários"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Visualizar Usuários</span>}
        </Link>

        <Link href="/relatorio" className={styles.link}>
          <Image
            src="/icons/clipboard.png"
            alt="Relatório"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Relatório</span>}
        </Link>

        <Link href="/logout" className={styles.link}>
          <Image
            src="/icons/logout.png"
            alt="Logout"
            width={24}
            height={24}
            className={styles.icon}
          />
          {isMenuOpen && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
