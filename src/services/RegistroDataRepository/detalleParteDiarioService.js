import { apiClient } from "../../boot/axios";

export const deactivateDetail = async (detalleParteDiarioId) => {
  try {
    const response = await apiClient.put(
      `/api/DetalleParteDiario/Deactivate/${detalleParteDiarioId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar la información del detalleParteDiarioId:",
      error
    );
    throw error;
  }
};

export const getAllDetalleParteDiariosActive = async (parteDiarioId) => {
  try {
    const response = await apiClient.get(
      `/api/DetalleParteDiario/GetAllActive/${parteDiarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del parteDiario:", error);
    throw error;
  }
};

export const createDetalleParteDiario = async (detalleParteDiarioData) => {
  try {
    const response = await apiClient.post(
      "/api/DetalleParteDiario/Create",
      detalleParteDiarioData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la información del detalle parte diario:",
      error
    );
    throw error;
  }
};
