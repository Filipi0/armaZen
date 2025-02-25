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

  const [nearExpirationItems, setNearExpirationItems] = useState([]);
  const [nearExpirationCount, setNearExpirationCount] = useState(0);
  const [loadingNearExpiration, setLoadingNearExpiration] = useState(true);

  const [lowStockItems, setLowStockItems] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loadingLowStock, setLoadingLowStock] = useState(true); 

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
    } else {
      // Busca os dois filtros simultaneamente
      fetchStockDetails("near-expiration", token)
        .then((nearData) => {
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
        })
        .catch((error) => {
          console.error("Erro ao buscar itens perto do vencimento:", error);
        })
        .finally(() => setLoadingNearExpiration(false)); 

      fetchStockDetails("low-stock", token)
        .then((lowData) => {
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
        })
        .catch((error) => {
          console.error("Erro ao buscar itens prestes a esgotar:", error);
        })
        .finally(() => setLoadingLowStock(false));
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
