import { apiClient } from "../../boot/axios";

export const getAllPersonalsActive = async () => {
  try {
    const response = await apiClient.get("/api/Personal/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los personales:", error);
    throw error;
  }
};

export const getAllPersonalsInactive = async () => {
  try {
    const response = await apiClient.get("/api/Personal/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los personales:", error);
    throw error;
  }
};

export const updatePersonal = async (personalData) => {
  try {
    const response = await apiClient.put("/api/Personal/Update", personalData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del personal:", error);
    throw error;
  }
};

export const createPersonal = async (personalData) => {
  try {
    const response = await apiClient.post("/api/Personal/Create", personalData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del personal:", error);
    throw error;
  }
};

export const changePassword = async (personalData) => {
  try {
    const response = await apiClient.post(
      "/api/Personal/ChangePassword",
      personalData
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la nueva contraseña:", error);
    throw error;
  }
};

export const deactivate = async (personalId) => {
  try {
    const response = await apiClient.put(
      `/api/Personal/Deactivate/${personalId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del personal:", error);
    throw error;
  }
};

export const activate = async (personalId) => {
  try {
    const response = await apiClient.put(
      `/api/Personal/Activate/${personalId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del personal:", error);
    throw error;
  }
};
