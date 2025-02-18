const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchStockSummary = async (token) => {
  try {
    const response = await fetch(`${API_URL}/stock-details`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar resumo do estoque:", error.message);
    throw error;
  }
};

/**
 * Obtém detalhes do estoque com base no tipo de filtro
 * @param {string} filterType - Tipo do filtro ("near-expiration", "low-stock", etc)
 * @param {string} token - Token JWT para autenticação
 * @returns {Promise<Array>} - Lista de produtos detalhados
 */
export const fetchStockDetails = async (filterType, token) => {
  try {
    const response = await fetch(`${API_URL}/stock-details/${filterType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar detalhes para '${filterType}':`, error.message);
    throw error;
  }
};
