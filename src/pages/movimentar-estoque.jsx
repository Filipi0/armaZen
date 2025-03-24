import { fetchProducts, moveStock, deleteProduct } from "../services/productService";
import React, { useState, useEffect } from "react"; 
import Header from "../pages/components/header";
import Footer from "../pages/components/footer";
import styles from "../styles/movimentar-estoque.module.css"

export default function MovimentarEstoque() {
  const [estoques, setEstoques] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [movementType, setMovementType] = useState("entrada"); 
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

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

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1); 
    setSearchTerm(item.name);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleSave = () => {
    if (!selectedItem) {
      alert("Selecione um item para movimentar.");
      return;
    }
    setModalType("save");
    setShowModal(true);
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("token");
    try {
      if (modalType === "save") {
        await moveStock(selectedItem.id, movementType, quantity, token);
        alert("Movimentação registrada com sucesso!");
  
        setEstoques((prevEstoques) =>
          prevEstoques.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  quantity:
                    movementType === "entrada"
                      ? item.quantity + quantity
                      : item.quantity - quantity,
                }
              : item
          )
        );
      }
  
      if (modalType === "delete") {
        await deleteProduct(selectedItem.id, token);
        setEstoques(estoques.filter((item) => item.id !== selectedItem.id));
        alert("Produto excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert(`Erro: ${error.message || "Falha ao processar a requisição"}`);
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
          <label htmlFor="search" className={styles.searchLabel}>
            Pesquisa
          </label>
          <input
            type="text"
            id="search"
            placeholder="Buscar item..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
          />

          {searchTerm.length > 0 && (
            <div className={styles.productList}>
              {estoques
                .filter((item) => item.name.toLowerCase().includes(searchTerm))
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

          <div className={styles.flexRow}>
            <div className={styles.flexItem}>
              <label htmlFor="quantity" className={styles.searchLabel}>
                Quantidade
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.flexItem}>
              <label htmlFor="movementType" className={styles.searchLabel}>
                Tipo
              </label>
              <select
                id="movementType"
                className={styles.searchInput}
                onChange={(e) => setMovementType(e.target.value)}
                value={movementType}
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.button} onClick={handleSave}>
              Movimentar Estoque
            </button>
          </div>
        </section>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirmar Movimentação</h3>
            <p>
              {`Registrar ${quantity} unidade(s) como ${movementType} para "${selectedItem?.name}"?`}
            </p>
            <div className={styles.modalButtons}>
              <button onClick={confirmAction} className={styles.modalConfirm}>
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.modalCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
