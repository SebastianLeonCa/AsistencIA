import { apiClient } from "../../boot/axios";

export const getAlumnos = async (idSesion) => {
  try {
    const response = await apiClient.get(
      `/api/Sesiones/asistenciaAlumnos/${idSesion}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los alumnos:", error);
    throw error;
  }
};
