import { api } from "../services/api";

const getProducts = async () => {
  try {
    const response = await api.get("produto/query/BaioSystem");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

export { getProducts };
