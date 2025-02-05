"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "./components/footer.jsx";
import Card from "./components/card.jsx";
import Header from "./components/header";
import styles from "../styles/index.module.css";

export default function Home() {
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
