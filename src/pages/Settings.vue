<template>
  <div class="page-container">
    <div class="change-password-container">
      <button class="close-button" @click="goBack" aria-label="Cerrar">
        ×
      </button>
      <h1 class="title">Cambio de Contraseña</h1>
      <div class="user-info">
        <p class="username"></p>
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
import { useRouter } from "vue-router";
import { changePwd } from "../services/logInService";

export default {
  name: "ChangePassword",
  setup() {
    const router = useRouter();

    const storedUserData = localStorage.getItem("userData");
    const idUsuario = storedUserData
      ? JSON.parse(storedUserData).idUsuario.toString()
      : "";

    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const handleChangePassword = async () => {
      errorMessage.value = "";
      successMessage.value = "";

      if (
        !currentPassword.value ||
        !newPassword.value ||
        !confirmPassword.value
      ) {
        errorMessage.value = "Por favor completa todos los campos.";
        return;
      }

      if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = "Las nuevas contraseñas no coinciden.";
        return;
      }

      try {
        await changePwd({
          usuario: idUsuario,
          contrasena: currentPassword.value,
          newContrasena: newPassword.value,
        });
        successMessage.value = "✅ Contraseña cambiada exitosamente.";
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      } catch (error) {
        errorMessage.value =
          "❌ Error al cambiar la contraseña. Verifica los datos ingresados.";
      }
    };

    const goBack = () => {
      router.push("/home");
    };

    return {
      idUsuario,
      currentPassword,
      newPassword,
      confirmPassword,
      errorMessage,
      successMessage,
      handleChangePassword,
      goBack,
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
  background-image: url("../assets/esan_frontis.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.change-password-container {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-width: 15px; /* Grosor del borde */
  border-style: solid;
  border-color: #d5d5d5;
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
  background-color: #b40000;
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
.close-button {
  position: absolute;
  top: 1px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-weight: bold;
}

.close-button:hover {
  color: #b40000;
}
</style>
