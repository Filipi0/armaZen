"use client";
import React, { useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/cadastroItens.module.css";
import { createProduct } from "../services/productService";

function CadastroItens() {
  const [tipoItem, setTipoItem] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [nomeItem, setNomeItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("caixa");
  const [validade, setValidade] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoItem = {
      itemType: tipoItem,
      supplier: fornecedor,
      name: nomeItem,
      quantity: parseInt(quantidade),
      unit: unidadeMedida,
      expirationDate: validade || null,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Erro: Usuário não autenticado.");
        return;
      }

      await createProduct(novoItem, token);
      setShowModal(true); 

      setTipoItem("");
      setFornecedor("");
      setNomeItem("");
      setQuantidade("");
      setUnidadeMedida("caixa");
      setValidade("");
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Cadastro de Itens</h2>
        <main className={styles.container}>
          <section className={styles.formSection}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="tipo-item">Tipo do Item</label>
                  <input
                    type="text"
                    id="tipo-item"
                    value={tipoItem}
                    onChange={(e) => setTipoItem(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="fornecedor">Fornecedor</label>
                  <input
                    type="text"
                    id="fornecedor"
                    placeholder="Opcional"
                    value={fornecedor}
                    onChange={(e) => setFornecedor(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome-item">Nome do item</label>
                  <input
                    type="text"
                    id="nome-item"
                    value={nomeItem}
                    onChange={(e) => setNomeItem(e.target.value)}
                    
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="quantidade">Quantidade</label>
                  <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="unidade-medida">Unidade de Medida</label>
                  <select
                    id="unidade-medida"
                    className={styles.select}
                    value={unidadeMedida}
                    onChange={(e) => setUnidadeMedida(e.target.value)}
                  >
                    <option value="caixa">Caixa</option>
                    <option value="unidade">Unidade</option>
                    <option value="litro">Litro</option>
                    <option value="metro">Metro</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="validade">Data de Validade</label>
                  <input
                    type="date"
                    id="validade"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.formRow2}>
                <button type="submit" className={styles.btn}>
                  Cadastrar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Produto cadastrado com sucesso!</h3>
            <p>O item foi adicionado ao estoque.</p>
            <button onClick={() => setShowModal(false)} className={styles.btn}>
              Fechar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default CadastroItens;
