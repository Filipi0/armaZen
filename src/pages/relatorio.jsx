"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Card from "./components/card.jsx";
import styles from "../styles/relatorio.module.css";
import { fetchStockSummary, fetchStockDetails } from "../services/stockService.js";


export default function Relatorio() {
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Erro: Usuário não autenticado.");
          return;
        }
  
        // Buscar resumo do estoque
        const summaryData = await fetchStockSummary(token);
        setSummary(summaryData);
  
        // Buscar detalhes de cada categoria e armazenar no estado
        const categories = [
          "near-expiration",
          "low-stock",
          "expired-this-month",
          "out-of-stock-this-month",
          "untouched-this-month",
          "most-moved-items",
        ];
  
        const detailsData = {};
        for (const category of categories) {
          const data = await fetchStockDetails(category, token);
          detailsData[category] = data.length > 0 ? data : []; // Garante que seja um array
        }
  
        setDetails(detailsData);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadStockData();
  }, []);
  

  return (
    <>
      <div className={styles.body}>
        <Header />
        <h2 className={styles.h2}>Relatório</h2>
        <div className={styles.container}>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
             <Card
  titleCollapsed="Itens expirados durante o mês"
  count={summary?.expiredThisMonth || 0}
  items={
    details["expired-this-month"]?.length > 0
      ? details["expired-this-month"].map((item) => `${item.id} - ${item.name}`)
      : ["Não há itens expirados para esse mês"]
  }
/>

              <Card
                titleCollapsed="Itens esgotados durante o mês"
                count={summary?.outOfStockThisMonth || 0}
                items={
                  details["out-of-stock-this-month"]?.map(
                    (item) => `${item.id} - ${item.name}`
                  ) || ["Nenhum item esgotado"]
                }
              />
              <Card
                titleCollapsed="Itens que não foram movimentados durante o mês"
                count={summary?.untouchedThisMonth || 0}
                items={
                  details["untouched-this-month"]?.map(
                    (item) => `${item.id} - ${item.name}`
                  ) || ["Todos os itens foram movimentados"]
                }
              />
              <Card
                titleCollapsed="Itens mais movimentados durante o mês"
                count={summary?.mostMovedItems || 0}
                items={
                  details["most-moved-items"]?.map(
                    (item) => `${item.id} - ${item.name}`
                  ) || ["Nenhum item se destacou"]
                }
              />
              <Card
                titleCollapsed="Itens perto do vencimento"
                count={summary?.nearExpiration || 0}
                items={
                  details["near-expiration"]?.map(
                    (item) => `${item.id} - ${item.name}`
                  ) || ["Nenhum item perto do vencimento"]
                }
              />
              <Card
                titleCollapsed="Itens prestes a esgotar"
                count={summary?.lowStock || 0}
                items={
                  details["low-stock"]?.map(
                    (item) => `${item.id} - ${item.name} - ${item.quantity} unidades`
                  ) || ["Nenhum item prestes a esgotar"]
                }
              />
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
