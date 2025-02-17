const API_URL = process.env.NEXT_PUBLIC_API_URL + "/products";

/**
 * Cadastra um novo produto na API
 * @param {Object} productData - Dados do produto a ser cadastrado
 * @param {string} token - Token JWT para autenticação
 * @returns {Promise<Object>} - Resposta da API
 */
export const createProduct = async (productData, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Erro ao cadastrar o produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error.message);
    throw error;
  }
};

/**
 * Obtém a lista de produtos do backend
 * @param {string} token - Token JWT para autenticação
 * @returns {Promise<Array>} - Lista de produtos
 */
export const fetchProducts = async (token) => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Erro ao buscar produtos");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    throw error;
  }
};

/**
 * Deleta um produto pelo ID
 * @param {string} productId - ID do produto a ser excluído
 * @param {string} token - Token JWT para autenticação
 * @returns {Promise<Object>} - Resposta da API
 */
export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Erro ao deletar o produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao deletar produto:", error.message);
    throw error;
  }
};

/**
 * Atualiza a quantidade de um produto no estoque
 * @param {string} productId - ID do produto a ser atualizado
 * @param {string} action - 'increment' ou 'decrement'
 * @param {number} amount - Quantidade a ser alterada
 * @param {string} token - Token JWT para autenticação
 * @returns {Promise<Object>} - Resposta da API
 */
export const updateProductQuantity = async (
  productId,
  action,
  amount,
  token
) => {
  try {
    const response = await fetch(`${API_URL}/${productId}/update-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action, amount }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.error || "Erro ao atualizar a quantidade do produto"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error.message);
    throw error;
  }
};
