import { authClient } from "../boot/axios";

export const LogIn = async (credentials) => {
  try {
    const response = await authClient.post("/api/Usuarios/LogIn", credentials);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await authClient.get("/api/Usuarios");
    return response.data;
  } catch (error) {
    console.error("Error al obtener la información de los rols:", error);
    throw error;
  }
};

export const changePwd = async ({ usuario, contrasena, newContrasena }) => {
  console.log({ usuario, contrasena, newContrasena });
  try {
    const response = await authClient.post(`/api/Usuarios/ChangePassword`, {
      usuario,
      contrasena,
      newContrasena,
    });
    return response.data;
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw error;
  }
};
