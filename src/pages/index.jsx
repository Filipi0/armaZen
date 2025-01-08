"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/index.module.css";
import Footer from "./components/footer.jsx";
import Card from "./components/card.jsx";
import Header from "./components/header";

export default function Menu() {
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para abrir/recolher o menu
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");

    if (isAuthenticated !== "true") {
      router.replace("/login"); // Redireciona para a página de login
    }
  }, [router]);

  return (
    
    <div className={styles.container}>
  <Header />
      {/* Menu lateral */}
      <div
        className={`${styles.leftSide} ${isMenuOpen ? styles.menuOpen : ""}`}
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
              src="/icons/flecha.png"
              alt="Movimentar Itens"
              width={24}
              height={24}
              className={styles.icon}
            />
            {isMenuOpen && <span>Movimentar Itens</span>}
          </Link>

          <Link href="/vizualizar-estoques" className={styles.link}>
            <Image
              src="/icons/box2.png"
              alt="Visualizar Estoques"
              width={24}
              height={24}
              className={styles.icon}
            />
            {isMenuOpen && <span>Visualizar Estoques</span>}
          </Link>

          <Link href="/cadastro-usuarios" className={styles.link}>
            <Image
              src="/icons/addUsers.png"
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
              src="/icons/relatorio.png"
              alt="Relatório"
              width={24}
              height={24}
              className={styles.icon}
            />
            {isMenuOpen && <span>Relatório</span>}
          </Link>

        </div>
      </div>
      {/* Conteúdo principal */}
      <div className={styles.rightSide}>
        <div>
          <Card
            titleCollapsed="Itens perto do vencimento"
            count={0}
            items={["Não há itens perto do vencimento"]}
          />
          <Card
            titleCollapsed="Itens prestes a esgotar"
            count={5}
            items={[
              "00005 - pó de café - 3 unidades",
              "00023 - fita gomada - 5 unidades",
              "00002 - papel ofício - 2 unidades",
              "00009 - lâmpada 15w - 1 unidade",
              "00011 - refil para grampeador - 4 unidades",
            ]}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}