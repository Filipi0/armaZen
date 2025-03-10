import { getToken } from "../utils/storage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Cadastra um novo usuário.
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export const registerUser = async (userData) => {
  const token = getToken();
  if (!token) throw new Error("Token ausente");

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao cadastrar usuário");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Faz login do usuário.
 * @param {Object} loginData - Dados de login (email, senha)
 * @returns {Promise<Object>} - Retorna o token de autenticação
 */
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao fazer login");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Obtém a lista de usuários (Somente Admin).
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object[]>} - Lista de usuários
 */
export const getUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao buscar usuários");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Deleta um usuário (Somente Admin).
 * @param {string} userId - ID do usuário a ser excluído
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} - Resposta do servidor
 */
export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao excluir usuário");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Atualiza a senha do usuário logado.
 * @param {string} userId - ID do usuário
 * @param {string} newPassword - Nova senha
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} - Resposta do servidor
 */
export const updatePassword = async (userId, newPassword, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao atualizar senha");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Envia um email de recuperação de senha.
 * @param {string} email - Email do usuário
 * @returns {Promise<Object>} - Resposta do servidor
 */
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao enviar email de recuperação");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};

/**
 * Redefine a senha do usuário com base no token de recuperação.
 * @param {string} token - Token de recuperação
 * @param {string} newPassword - Nova senha
 * @returns {Promise<Object>} - Resposta do servidor
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao redefinir senha");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Erro ao conectar ao servidor");
  }
};


