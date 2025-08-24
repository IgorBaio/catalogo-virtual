import { api } from "../services/api";

const getProducts = async (name?: string) => {
  try {
    const response = await api.get("produto/query/BaioSystems", {
      params: name ? { name: name.toLowerCase() } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
};

export { getProducts };
