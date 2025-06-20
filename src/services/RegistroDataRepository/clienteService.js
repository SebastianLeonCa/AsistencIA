import { apiClient } from "src/boot/axios";

export const getAllClientesActive = async () => {
  try {
    const response = await apiClient.get("/api/Cliente/GetAllActive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los clientes:", error);
    throw error;
  }
};

export const getAllClientesInactive = async () => {
  try {
    const response = await apiClient.get("/api/Cliente/GetAllInactive");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los clientes:", error);
    throw error;
  }
};

export const updateCliente = async (clienteData) => {
  try {
    const response = await apiClient.put("/api/Cliente/Update", clienteData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la información del cliente:", error);
    throw error;
  }
};

export const createCliente = async (clienteData) => {
  try {
    const response = await apiClient.post("/api/Cliente/Create", clienteData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la información del cliente:", error);
    throw error;
  }
};

export const deactivate = async (clienteId) => {
  try {
    const response = await apiClient.put(
      `/api/Cliente/Deactivate/${clienteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del cliente:", error);
    throw error;
  }
};

export const activate = async (clienteId) => {
  try {
    const response = await apiClient.put(`/api/Cliente/Activate/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la información del cliente:", error);
    throw error;
  }
};
