import { apiClient } from "../../boot/axios";

export const getAllMarcasActive = async () => {
  try {
    const response = await apiClient.get("/api/Marca/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los marcas:", error);
    throw error;
  }
};

export const getAllMarcasInactive = async () => {
  try {
    const response = await apiClient.get("/api/Marca/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los marcas:", error);
    throw error;
  }
};

export const updateMarca = async (marcaData) => {
  try {
    const response = await apiClient.put("/api/Marca/Update", marcaData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del marca:", error);
    throw error;
  }
};

export const createMarca = async (marcaData) => {
  try {
    const response = await apiClient.post("/api/Marca/Create", marcaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del marca:", error);
    throw error;
  }
};

export const deactivate = async (marcaId) => {
  try {
    const response = await apiClient.put(`/api/Marca/Deactivate/${marcaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del marca:", error);
    throw error;
  }
};

export const activate = async (marcaId) => {
  try {
    const response = await apiClient.put(`/api/Marca/Activate/${marcaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del marca:", error);
    throw error;
  }
};
