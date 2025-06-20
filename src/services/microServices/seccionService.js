import { apiClient } from "../../boot/axios";

export const getSesiones = async (idSeccion) => {
  try {
    const response = await apiClient.get(
      `/api/Secciones/sesiones/${idSeccion}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de las sesiones:", error);
    throw error;
  }
};
