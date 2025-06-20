import { apiClient } from "../../boot/axios";

export const getAllParteDiariosActive = async () => {
  try {
    const response = await apiClient.get("/api/ParteDiario/GetAllActive");
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la información de los parteDiarios:",
      error
    );
    throw error;
  }
};

export const getAllParteDiariosInactive = async () => {
  try {
    const response = await apiClient.get("/api/ParteDiario/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la información de los parteDiarios:",
      error
    );
    throw error;
  }
};

export const updateParteDiario = async (parteDiarioData) => {
  try {
    const response = await apiClient.put(
      "/api/ParteDiario/Update",
      parteDiarioData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del parteDiario:", error);
    throw error;
  }
};

export const createParteDiario = async (parteDiarioData) => {
  try {
    const response = await apiClient.post(
      "/api/ParteDiario/Create",
      parteDiarioData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del parteDiario:", error);
    throw error;
  }
};

export const deactivate = async (parteDiarioId) => {
  try {
    const response = await apiClient.put(
      `/api/ParteDiario/Deactivate/${parteDiarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del parteDiario:", error);
    throw error;
  }
};

export const activate = async (parteDiarioId) => {
  try {
    const response = await apiClient.put(
      `/api/ParteDiario/Activate/${parteDiarioId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del parteDiario:", error);
    throw error;
  }
};
