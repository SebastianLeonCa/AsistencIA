import { apiClient } from "../boot/axios";

export const loadData = async () => {
  try {
    const response = await apiClient.get("/data");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};
