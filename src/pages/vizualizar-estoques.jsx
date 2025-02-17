"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/vizualizar-estoques.module.css";
import { fetchProducts } from "../services/productService";

function VisualizarEstoques() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("nome");
  const [estoques, setEstoques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Erro: Usuário não autenticado.");
          return;
        }

        const data = await fetchProducts(token);
        setEstoques(data);
      } catch (error) {
        alert("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtragem de estoques
  const filteredEstoques = estoques.filter((estoque) => {
    if (!estoque) return false;
    const lowerCaseSearch = searchTerm.toLowerCase();

    switch (filter) {
      case "nome":
        return estoque.name.toLowerCase().includes(lowerCaseSearch);
      case "codigo":
        return estoque.id.toString().includes(lowerCaseSearch);
      case "tipo":
        return estoque.itemType.toLowerCase().includes(lowerCaseSearch);
      case "fornecedor":
        return estoque.supplier?.toLowerCase().includes(lowerCaseSearch);
      case "unidade":
        return estoque.unit.toLowerCase().includes(lowerCaseSearch);
      case "quantidade":
        return estoque.quantity.toString().includes(lowerCaseSearch);
      case "validade":
        return estoque.expirationDate
          ? new Date(estoque.expirationDate).toLocaleDateString().includes(lowerCaseSearch)
          : false;
      default:
        return true;
    }
  });

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Visualizar Estoques</h2>

        <main className={styles.container}>
          <section className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <label htmlFor="search" className={styles.searchLabel}>Pesquisar</label>
              <div className={styles.searchInputContainer}>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button type="button" className={styles.searchIcon}>
                  🔍
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="filter" className={styles.filterLabel}>Filtrar por</label>
              <select
                id="filter"
                className={styles.filterSelect}
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="nome">Nome do item</option>
                <option value="codigo">Código</option>
                <option value="tipo">Tipo do Item</option>
                <option value="fornecedor">Fornecedor</option>
                <option value="unidade">Unidade de Medida</option>
                <option value="quantidade">Quantidade</option>
                <option value="validade">Data de Validade</option>
              </select>
            </div>
          </section>

          {/* Exibir loading enquanto os dados carregam */}
          {loading ? (
            <p className={styles.loading}>Carregando produtos...</p>
          ) : (
            <section className={styles.tableSection}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome do Item</th>
                    <th>Tipo do Item</th>
                    <th>Fornecedor</th>
                    <th>Unidade</th>
                    <th>Quantidade</th>
                    <th>Data de Validade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEstoques.length > 0 ? (
                    filteredEstoques.map((estoque) => (
                      <tr key={estoque.id}>
                        <td>{estoque.id}</td>
                        <td>{estoque.name}</td>
                        <td>{estoque.itemType}</td>
                        <td>{estoque.supplier || "N/A"}</td>
                        <td>{estoque.unit}</td>
                        <td>{estoque.quantity}</td>
                        <td>{estoque.expirationDate ? new Date(estoque.expirationDate).toLocaleDateString() : "Sem validade"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className={styles.noResults}>
                        Nenhum produto encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default VisualizarEstoques;
