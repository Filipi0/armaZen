"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/movimentar-estoque.module.css";
import { fetchProducts, updateProductQuantity, deleteProduct } from "../services/productService";

export default function MovimentarEstoque() {
  const [estoques, setEstoques] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "save" ou "delete"

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
        alert("Erro ao carregar estoques");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity);
    setSearchTerm(item.name);
  };

  const handleIncrement = () => {
    if (selectedItem) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (selectedItem && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSave = () => {
    if (!selectedItem) {
      alert("Selecione um item para atualizar.");
      return;
    }
    setModalType("save");
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!selectedItem) {
      alert("Selecione um item para excluir.");
      return;
    }
    setModalType("delete");
    setShowModal(true);
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("token");

    try {
      if (modalType === "save") {
        const difference = quantity - selectedItem.quantity;

        if (difference !== 0) {
          const action = difference > 0 ? "increment" : "decrement";
          await updateProductQuantity(selectedItem.id, action, Math.abs(difference), token);
        }

        setSelectedItem({ ...selectedItem, quantity });
        alert("Quantidade atualizada com sucesso!");
      }

      if (modalType === "delete") {
        await deleteProduct(selectedItem.id, token);
        setEstoques(estoques.filter((item) => item.id !== selectedItem.id));
        setSelectedItem(null);
        setQuantity(1);
        alert("Produto excluído com sucesso!");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Header />
      <h2 className={styles.h2}>Movimentar Estoques</h2>
      <div className={styles.container}>
        <section className={styles.searchSection}>
          <label htmlFor="search" className={styles.searchLabel}>Pesquisa</label>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              id="search"
              placeholder="Buscar item..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {searchTerm.length > 0 && (
            <div className={styles.productList}>
              {estoques
                .filter((item) =>
                  item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className={styles.productItem}
                    onClick={() => handleSelectItem(item)}
                  >
                    <strong>{item.name}</strong> - {item.quantity} {item.unit}
                  </div>
                ))}
            </div>
          )}

          <label htmlFor="quantity" className={styles.searchLabel2}>Quantidade de Movimentação</label>

          <div className={styles.containerInput}>
            <svg
              className={styles.decrement}
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleDecrement}
            >
              <path d="M11.2321 16C10.4623 17.3333 8.53775 17.3333 7.76795 16L0.406734 3.25C-0.363066 1.91667 0.599184 0.25 2.13878 0.25L16.8612 0.25C18.4008 0.25 19.3631 1.91667 18.5933 3.25L11.2321 16Z" fill="#00A7E1" />
            </svg>

            <input type="number" id="quantity" value={quantity} readOnly className={styles.searchInput2} />

            <svg
              className={styles.increment}
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleIncrement}
            >
              <path d="M7.76795 1C8.53775 -0.333333 10.4623 -0.333333 11.2321 1L18.5933 13.75C19.3631 15.0833 18.4008 16.75 16.8612 16.75H2.13878C0.599184 16.75 -0.363067 15.0833 0.406733 13.75L7.76795 1Z" fill="#00A7E1" />
            </svg>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.button} onClick={handleSave}>Salvar</button>
            <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={handleDelete}>Excluir</button>
          </div>
        </section>
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>{modalType === "save" ? "Confirmar Movimentação" : "Confirmar Exclusão"}</h3>
            <p>
              {modalType === "save"
                ? `Deseja atualizar a quantidade do item "${selectedItem?.name}" para ${quantity}?`
                : `Tem certeza que deseja excluir o item "${selectedItem?.name}"? Essa ação não pode ser desfeita.`}
            </p>
            <div className={styles.modalButtons}>
              <button onClick={confirmAction} className={styles.modalConfirm}>Confirmar</button>
              <button onClick={() => setShowModal(false)} className={styles.modalCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
