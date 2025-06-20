import { apiClient } from "../../boot/axios";

export const getAllMaquinariasActive = async () => {
  try {
    const response = await apiClient.get("/api/Maquinaria/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los maquinarias:", error);
    throw error;
  }
};

export const getAllMaquinariasInactive = async () => {
  try {
    const response = await apiClient.get("/api/Maquinaria/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los maquinarias:", error);
    throw error;
  }
};

export const updateMaquinaria = async (maquinariaData) => {
  try {
    const response = await apiClient.put(
      "/api/Maquinaria/Update",
      maquinariaData
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del maquinaria:", error);
    throw error;
  }
};

export const createMaquinaria = async (maquinariaData) => {
  try {
    const response = await apiClient.post(
      "/api/Maquinaria/Create",
      maquinariaData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del maquinaria:", error);
    throw error;
  }
};

export const deactivate = async (maquinariaId) => {
  try {
    const response = await apiClient.put(
      `/api/Maquinaria/Deactivate/${maquinariaId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del maquinaria:", error);
    throw error;
  }
};

export const activate = async (maquinariaId) => {
  try {
    const response = await apiClient.put(
      `/api/Maquinaria/Activate/${maquinariaId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del maquinaria:", error);
    throw error;
  }
};
