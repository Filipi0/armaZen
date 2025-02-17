import { saveToken, removeToken, getToken } from "../utils/storage";

export async function login(email, password) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao fazer login");
    }

    if (data.token) {
      saveToken(data.token);
      return { success: true };
    }

    throw new Error("Resposta inesperada da API");
  } catch (error) {
    console.error("Erro no login:", error.message);
    return { success: false, message: error.message };
  }
}

export function logout() {
  removeToken();
}

export function isAuthenticated() {
  return !!getToken();
}
