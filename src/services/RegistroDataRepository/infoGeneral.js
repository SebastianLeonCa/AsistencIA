import { apiClient } from "../../boot/axios";

export const getInfoGeneralResumen = async () => {
  try {
    const response = await apiClient.get("/api/InfoGeneral/Resumen");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información:", error);
    throw error;
  }
};
