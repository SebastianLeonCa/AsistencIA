import { apiClient } from "../../boot/axios";

export const getAllLugarsActive = async () => {
  try {
    const response = await apiClient.get("/api/LugarTrabajo/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los lugars:", error);
    throw error;
  }
};

export const getAllLugarsInactive = async () => {
  try {
    const response = await apiClient.get("/api/LugarTrabajo/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los lugars:", error);
    throw error;
  }
};

export const updateLugar = async (lugarData) => {
  try {
    const response = await apiClient.put("/api/LugarTrabajo/Update", lugarData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del lugar:", error);
    throw error;
  }
};

export const createLugar = async (lugarData) => {
  try {
    const response = await apiClient.post(
      "/api/LugarTrabajo/Create",
      lugarData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del lugar:", error);
    throw error;
  }
};

export const deactivate = async (lugarId) => {
  try {
    const response = await apiClient.put(
      `/api/LugarTrabajo/Deactivate/${lugarId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del lugar:", error);
    throw error;
  }
};

export const activate = async (lugarId) => {
  try {
    const response = await apiClient.put(
      `/api/LugarTrabajo/Activate/${lugarId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del lugar:", error);
    throw error;
  }
};
