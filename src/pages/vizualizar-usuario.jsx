"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import styles from "../styles/visualizar-usuarios.module.css";
import { getUsers } from "../services/userService.js";
import { getToken } from "../utils/storage.js";

function VisualizarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = getToken(); 
        if (!token) {
          alert("Erro: Usuário não autenticado.");
          return;
        }

        const data = await getUsers(token); 
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error.message);
        alert("Erro ao carregar usuários");
      } finally {
        setLoading(false); 
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h2 className={styles.h2}>Visualizar Usuários</h2>
        <main className={styles.container}>
          {loading ? (
            <p className={styles.loading}>Carregando usuários...</p>
          ) : (
            <section className={styles.tableSection}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Data de criação</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario, index) => (
                      <tr key={index}>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.createdAt}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className={styles.noResults}>
                        Nenhum usuário encontrado
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

export default VisualizarUsuarios;
