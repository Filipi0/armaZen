"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../pages/components/footer.jsx";
import Card from "../pages/components/card.jsx";
import Header from "../pages/components/header";
import styles from "../styles/index.module.css";
import { getToken } from "../utils/storage"; // Obtém o token armazenado

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login"); // Redireciona se não estiver autenticado
    } else {
      setIsLoading(false); // Exibe o conteúdo apenas se autenticado
    }
  }, [router]);

  if (isLoading) {
    return <p>Carregando...</p>; // Evita piscar a tela antes do redirecionamento
  }

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
