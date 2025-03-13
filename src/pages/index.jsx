"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../pages/components/footer.jsx";
import Card from "../pages/components/card.jsx";
import Header from "../pages/components/header";
import styles from "../styles/index.module.css";
import { getToken, removeToken } from "../utils/storage"; // Adicionei removeToken
import { fetchStockDetails } from "../services/stockService";

export default function Home() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado do modal de logout

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
      Promise.all([
        fetchStockDetails("near-expiration", token),
        fetchStockDetails("low-stock", token),
        fetchStockDetails("expired-this-month", token),
      ])
        .then(([nearData, lowData, expiredThisMonthData]) => {
          setNearExpirationItems(Array.isArray(nearData) ? nearData : []);
          setNearExpirationCount(Array.isArray(nearData) ? nearData.length : 0);
          setLoadingNearExpiration(false);

          setLowStockItems(Array.isArray(lowData) ? lowData : []);
          setLowStockCount(Array.isArray(lowData) ? lowData.length : 0);
          setLoadingLowStock(false);

          setExpiredThisMonthItems(
            Array.isArray(expiredThisMonthData) ? expiredThisMonthData : []
          );
          setExpiredThisMonthCount(
            Array.isArray(expiredThisMonthData) ? expiredThisMonthData.length : 0
          );
          setLoadingExpiredThisMonth(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do estoque:", error);
        });
    }
  }, [router]);

  function handleLogout() {
    setShowLogoutModal(true);
  }

  function confirmLogout() {
    removeToken(); // Remove o token de autenticação
    router.replace("/login");
  }

  return (
    <div className={styles.container}>
      <Header onLogout={handleLogout} /> {/* Passando a função para o Header */}
      
      <div className={styles.rightSide}>
        <Card
          titleCollapsed="Itens perto do vencimento"
          count={loadingNearExpiration ? "Carregando..." : nearExpirationCount}
          items={loadingNearExpiration ? ["Carregando..."] : nearExpirationItems}
        />

        <Card
          titleCollapsed="Itens prestes a esgotar"
          count={loadingLowStock ? "Carregando..." : lowStockCount}
          items={loadingLowStock ? ["Carregando..."] : lowStockItems}
        />

        <Card
          titleCollapsed="Itens expirados neste mês"
          count={loadingExpiredThisMonth ? "Carregando..." : expiredThisMonthCount}
          items={loadingExpiredThisMonth ? ["Carregando..."] : expiredThisMonthItems}
        />
      </div>

      <Footer />

      {/* Modal de confirmação de logout */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Deseja realmente sair?</h2>
            <div className={styles.modalButtons}>
              <button onClick={confirmLogout} className={styles.confirmButton}>
                Sim, sair
              </button>
              <button onClick={() => setShowLogoutModal(false)} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
