"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Card from "./components/card.jsx";
import styles from "../styles/relatorio.module.css";
import {
  fetchStockSummary,
  fetchStockDetails,
} from "../services/stockService.js";

export default function Relatorio() {
  const [summary, setSummary] = useState({});
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // Lista de categorias
  const categories = [
    { key: "low-stock", label: "Itens prestes a esgotar" },
    { key: "near-expiration", label: "Itens perto do vencimento" },
    { key: "expired-this-month", label: "Itens expirados durante o mês" },
    { key: "out-of-stock-this-month", label: "Itens esgotados durante o mês" },
    { key: "untouched-this-month", label: "Itens não movimentados no mês" },
    { key: "most-moved-items", label: "Itens mais movimentados no mês" },
  ];

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Erro: Usuário não autenticado.");
          alert("Erro: Usuário não autenticado.");
          return;
        }

        console.log("🔹 Buscando resumo do estoque...");
        const summaryData = await fetchStockSummary(token);
        console.log("Resumo do estoque recebido:", summaryData);
        setSummary(summaryData);

        // Buscar detalhes de todas as categorias
        const detailsData = {};
        for (const category of categories) {
          console.log(`Buscando detalhes para '${category.key}'...`);
          const data = await fetchStockDetails(category.key, token);
          console.log(`Dados recebidos para '${category.key}':`, data);
          detailsData[category.key] = data.length > 0 ? data : [];
        }

        setDetails(detailsData);
      } catch (error) {
        console.error("Erro ao carregar os dados do estoque:", error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStockData();
  }, []);

  console.log("🔹 Dados finais antes da renderização:", { summary, details });

  return (
    <div className={styles.body}>
      <Header />
      <h2 className={styles.h2}>Relatório</h2>

      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : (
          categories.map((category) => (
            <Card
              key={category.key}
              titleCollapsed={category.label}
              count={details[category.key]?.length || 0} 
              items={
                details[category.key]?.length > 0
                  ? details[category.key].map(
                      (item) => `${item.id} - ${item.name}`
                    )
                  : ["Nenhum item encontrado"]
              }
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
