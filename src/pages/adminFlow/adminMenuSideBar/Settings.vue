<template>
  <div class="page-container">
    <div class="change-password-container">
      <h1 class="title">Cambio de Contraseña</h1>
      <div class="user-info">
        <p class="username">Usuario: {{ username }}</p>
      </div>
      <form @submit.prevent="handleChangePassword" class="form">
        <div class="form-group">
          <label for="current-password" class="label">Contraseña Actual</label>
          <input
            id="current-password"
            type="password"
            v-model="currentPassword"
            class="input"
            placeholder="Ingresa tu contraseña actual"
            required
          />
        </div>
        <div class="form-group">
          <label for="new-password" class="label">Nueva Contraseña</label>
          <input
            id="new-password"
            type="password"
            v-model="newPassword"
            class="input"
            placeholder="Ingresa tu nueva contraseña"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirm-password" class="label"
            >Confirma Nueva Contraseña</label
          >
          <input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            class="input"
            placeholder="Confirma tu nueva contraseña"
            required
          />
        </div>
        <button type="submit" class="button">Cambiar Contraseña</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { changePassword } from "../../../services/microServices/personalService";

export default {
  name: "ChangePassword",
  setup() {
    const storedUserData = localStorage.getItem("userData");
    const userData = ref(storedUserData ? JSON.parse(storedUserData) : null);
    const username = ref(userData.value?.usuario);

    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const handleChangePassword = async () => {
      if (
        !currentPassword.value ||
        !newPassword.value ||
        !confirmPassword.value
      ) {
        errorMessage.value = "Por favor, completa todos los campos.";
        successMessage.value = "";
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Las contraseñas no coinciden.";
        successMessage.value = "";
        return;
      }
      try {
        const response = await changePassword({
          Usuario: username.value,
          Contrasena: currentPassword.value,
          NewContrasena: newPassword.value,
        });
        successMessage.value = response || "Contraseña cambiada exitosamente.";
        errorMessage.value = "";
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      } catch (error) {
        errorMessage.value =
          error.response?.data?.message || "Error al cambiar la contraseña.";
        successMessage.value = "";
      }
    };

    return {
      username,
      currentPassword,
      newPassword,
      confirmPassword,
      errorMessage,
      successMessage,
      handleChangePassword,
    };
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f0f0, #d9d9d9);
}

.change-password-container {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-width: 15px; /* Grosor del borde */
  border-style: solid;
  border-color: #b97c7c;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.username {
  font-size: 18px;
  margin-bottom: 40px;
  color: #555;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #444;
  text-align: left;
}

.input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #da5656;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #d71515;
}

.error-message {
  color: red;
  margin-top: 15px;
}

.success-message {
  color: green;
  margin-top: 15px;
}
</style>
