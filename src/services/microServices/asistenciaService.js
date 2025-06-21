import { apiClient } from "../../boot/axios";

export const setAsistencia = async ({ idSesion, idUsuario, estado }) => {
  console.log("POST");
  console.log({ idSesion, idUsuario, estado });
  try {
    const response = await apiClient.post(`/api/Asistencias/`, {
      idSesion,
      idUsuario,
      estado,
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar una asistencia:", error);
    throw error;
  }
};

export const updateAsistencia = async ({
  idSesion,
  idUsuario,
  nuevoEstado,
}) => {
  console.log({ idSesion, idUsuario, nuevoEstado });
  try {
    const response = await apiClient.put(`/api/Asistencias/`, {
      idSesion,
      idUsuario,
      nuevoEstado,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error);
    throw error;
  }
};
