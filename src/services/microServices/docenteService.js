import { apiClient } from "../../boot/axios";

export const getSecciones = async (idDocente) => {
  try {
    const response = await apiClient.get(
      `/api/Usuarios/secciones/${idDocente}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de las secciones:", error);
    throw error;
  }
};
