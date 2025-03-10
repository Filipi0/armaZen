"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../pages/components/footer.jsx";
import Card from "../pages/components/card.jsx";
import Header from "../pages/components/header";
import styles from "../styles/index.module.css";
import { getToken } from "../utils/storage";
import { fetchStockDetails } from "../services/stockService";

export default function Home() {
  const router = useRouter();

  // Estados para itens perto do vencimento
  const [nearExpirationItems, setNearExpirationItems] = useState([]);
  const [nearExpirationCount, setNearExpirationCount] = useState(0);
  const [loadingNearExpiration, setLoadingNearExpiration] = useState(true);

  // Estados para itens de baixo estoque
  const [lowStockItems, setLowStockItems] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loadingLowStock, setLoadingLowStock] = useState(true);

  // Estados para itens expirados no mês
  const [expiredThisMonthItems, setExpiredThisMonthItems] = useState([]);
  const [expiredThisMonthCount, setExpiredThisMonthCount] = useState(0);
  const [loadingExpiredThisMonth, setLoadingExpiredThisMonth] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    } else {
      // Buscar os itens simultaneamente
      Promise.all([
        fetchStockDetails("near-expiration", token),
        fetchStockDetails("low-stock", token),
        fetchStockDetails("expired-this-month", token),
      ])
        .then(([nearData, lowData, expiredThisMonthData]) => {
          // Processa os itens perto do vencimento
          let nearItems = [];
          let nearCount = 0;
          if (Array.isArray(nearData)) {
            nearItems = nearData.map(
              (product) =>
                `${product.id} - ${product.name} - expira em ${new Date(
                  product.expirationDate
                ).toLocaleDateString()}`
            );
            nearCount = nearData.length;
          } else if (nearData.message) {
            console.log("Mensagem da API (near-expiration):", nearData.message);
            nearItems = [nearData.message];
          }
          setNearExpirationItems(nearItems);
          setNearExpirationCount(nearCount);
          setLoadingNearExpiration(false);

          // Processa os itens prestes a esgotar
          let lowItems = [];
          let lowCount = 0;
          if (Array.isArray(lowData)) {
            lowItems = lowData.map(
              (product) =>
                `${product.id} - ${product.name} - ${product.quantity} unidades`
            );
            lowCount = lowData.length;
          } else if (lowData.message) {
            console.log("Mensagem da API (low-stock):", lowData.message);
            lowItems = [lowData.message];
          }
          setLowStockItems(lowItems);
          setLowStockCount(lowCount);
          setLoadingLowStock(false);

          // Processa os itens expirados no mês
          let expiredItems = [];
          let expiredCount = 0;
          if (Array.isArray(expiredThisMonthData)) {
            expiredItems = expiredThisMonthData.map(
              (product) =>
                `${product.id} - ${product.name} - expirou em ${new Date(
                  product.expirationDate
                ).toLocaleDateString()}`
            );
            expiredCount = expiredThisMonthData.length;
          } else if (expiredThisMonthData.message) {
            console.log(
              "Mensagem da API (expired-this-month):",
              expiredThisMonthData.message
            );
            expiredItems = [expiredThisMonthData.message];
          }
          setExpiredThisMonthItems(expiredItems);
          setExpiredThisMonthCount(expiredCount);
          setLoadingExpiredThisMonth(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do estoque:", error);
        });
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.rightSide}>
        <div>
          <Card
            titleCollapsed="Itens perto do vencimento"
            count={
              loadingNearExpiration ? (
                <span style={{ fontSize: "15px", color: "#666" }}>
                  Carregando...
                </span>
              ) : (
                nearExpirationCount
              )
            }
            items={
              loadingNearExpiration
                ? [
                    <span style={{ fontSize: "15px", color: "#666" }}>
                      Carregando...
                    </span>,
                  ]
                : nearExpirationItems
            }
          />

          <Card
            titleCollapsed="Itens prestes a esgotar"
            count={
              loadingLowStock ? (
                <span style={{ fontSize: "15px", color: "#666" }}>
                  Carregando...
                </span>
              ) : (
                lowStockCount
              )
            }
            items={
              loadingLowStock
                ? [
                    <span style={{ fontSize: "15px", color: "#666" }}>
                      Carregando...
                    </span>,
                  ]
                : lowStockItems
            }
          />

          <Card
            titleCollapsed="Itens expirados neste mês"
            count={
              loadingExpiredThisMonth ? (
                <span style={{ fontSize: "15px", color: "#666" }}>
                  Carregando...
                </span>
              ) : (
                expiredThisMonthCount
              )
            }
            items={
              loadingExpiredThisMonth
                ? [
                    <span style={{ fontSize: "15px", color: "#666" }}>
                      Carregando...
                    </span>,
                  ]
                : expiredThisMonthItems
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
