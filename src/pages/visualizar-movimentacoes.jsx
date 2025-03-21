"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/visualizar-movimentacoes.module.css";
import { fetchMovements } from "../services/productService";

export default function VisualizarMovimentacoes() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Erro: Usuário não autenticado.");
          return;
        }

        const data = await fetchMovements(token);
        setMovements(data);
      } catch (error) {
        alert("Erro ao carregar movimentações");
      } finally {
        setLoading(false);
      }
    };

    loadMovements();
  }, []);

  return (
    <>
      <Header />
      <h2 className={styles.h2}>Histórico de Movimentações</h2>
      <div className={styles.container}>
        {loading ? (
          <p>Carregando...</p>
        ) : movements.length === 0 ? (
          <p>Nenhuma movimentação encontrada.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Usuário</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement) => (
                <tr key={movement.id}>
                  <td>{movement.product.name}</td>
                  <td>{movement.movementType === "entrada" ? "Entrada" : "Saída"}</td>
                  <td>{movement.quantity}</td>
                  <td>{movement.user?.name || "Admin"}</td>
                  <td>{new Date(movement.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
}
