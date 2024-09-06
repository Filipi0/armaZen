"use client";

import React, { useState, useEffect } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import styles from '../styles/movimentar-estoque.module.css';

export default function MovimentarEstoque() {
    const [estoques, setEstoques] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [quantity, setQuantity] = useState(1);        

    // Carregar itens do LocalStorage quando o componente for montado
    useEffect(() => {
        const storedEstoques = JSON.parse(localStorage.getItem('estoques')) || [];
        setEstoques(storedEstoques);
    }, []);

    // Função para pesquisar o item pelo nome
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const foundItem = estoques.find(item => item.nomeItem.toLowerCase().includes(term));
        if (foundItem) {
            setSelectedItem(foundItem);
            setQuantity(foundItem.quantidade);
        } else {
            setSelectedItem(null);
        }
    };

    // Incrementar a quantidade
    const handleIncrement = () => {
        if (quantity < 100) {
            setQuantity(quantity + 1);
        }
    };

    // Decrementar a quantidade
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Atualizar a quantidade no estoque
    const handleUpdate = () => {
        if (selectedItem) {
            const updatedEstoques = estoques.map(item =>
                item.nomeItem === selectedItem.nomeItem
                    ? { ...item, quantidade: quantity }
                    : item
            );
            setEstoques(updatedEstoques);
            localStorage.setItem('estoques', JSON.stringify(updatedEstoques));
            alert('Quantidade atualizada com sucesso!');
        } else {
            alert('Selecione um item válido.');
        }
    };

    // Excluir o item do estoque
    const handleDelete = () => {
        if (selectedItem) {
            const confirmDelete = window.confirm(`Tem certeza que deseja excluir o item ${selectedItem.nomeItem}?`);
            if (confirmDelete) {
                const updatedEstoques = estoques.filter(item => item.nomeItem !== selectedItem.nomeItem);
                setEstoques(updatedEstoques);
                localStorage.setItem('estoques', JSON.stringify(updatedEstoques));
                setSelectedItem(null);  // Desmarca o item após exclusão
                setQuantity(1);
                alert('Item excluído com sucesso!');
            }
        } else {
            alert('Selecione um item para excluir.');
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
                            name="search"
                            placeholder="Item que sofrerá alteração na quantidade"
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
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

                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="0"
                            max="100"
                            value={quantity}
                            step="0"
                            className={styles.searchInput2}
                            readOnly
                        />

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
                        <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={handleDelete}>Excluir</button>
                        <button type="button" className={styles.button} onClick={handleUpdate}>Atualizar</button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
