"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/components/MenuLateral.module.css";

export default function Menu({ isOpen, toggleMenu }) {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
      <nav className={styles.menuLinks}>
        <Link href="/cadastro-itens" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/box.png" alt="Cadastrar Itens" width={24} height={24} />
          <span>Cadastrar Itens</span>
        </Link>

        <Link href="/movimentar-estoque" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/flecha.png" alt="Movimentar Itens" width={24} height={24} />
          <span>Movimentar Itens</span>
        </Link>

        <Link href="/vizualizar-estoques" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/box2.png" alt="Visualizar Estoques" width={24} height={24} />
          <span>Visualizar Estoques</span>
        </Link>

        <Link href="/cadastro-usuarios" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/addUsers.png" alt="Cadastrar Usuários" width={24} height={24} />
          <span>Cadastrar Usuários</span>
        </Link>

        <Link href="/vizualizar-usuario" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/users.png" alt="Visualizar Usuários" width={24} height={24} />
          <span>Visualizar Usuários</span>
        </Link>

        <Link href="/relatorio" className={styles.link} onClick={toggleMenu}>
          <Image src="/icons/relatorio.png" alt="Relatório" width={24} height={24} />
          <span>Relatório</span>
        </Link>
      </nav>
    </div>
  );
}
