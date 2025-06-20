import { apiClient } from "../../boot/axios";

export const getAllRolsActive = async () => {
  try {
    const response = await apiClient.get("/api/Rol/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los rols:", error);
    throw error;
  }
};

export const getAllRolsInactive = async () => {
  try {
    const response = await apiClient.get("/api/Rol/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los rols:", error);
    throw error;
  }
};

export const updateRol = async (rolData) => {
  try {
    const response = await apiClient.put("/api/Rol/Update", rolData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del rol:", error);
    throw error;
  }
};

export const createRol = async (rolData) => {
  try {
    const response = await apiClient.post("/api/Rol/Create", rolData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del rol:", error);
    throw error;
  }
};

export const deactivate = async (rolId) => {
  try {
    const response = await apiClient.put(`/api/Rol/Deactivate/${rolId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del rol:", error);
    throw error;
  }
};

export const activate = async (rolId) => {
  try {
    const response = await apiClient.put(`/api/Rol/Activate/${rolId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del rol:", error);
    throw error;
  }
};
