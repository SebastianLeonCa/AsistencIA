<template>
  <div class="d-flex flex-row min-vh-100 m-0 bg-white">
    <!-- Sidebar -->
    <div class="sidebar">
      <a href="https://www.facebook.com/uesan/?locale=es_LA" target="_blank"
        ><i class="bi bi-facebook text-dark"></i
      ></a>
      <a href="https://www.youtube.com/user/UniversidadEsan" target="_blank"
        ><i class="bi bi-youtube text-dark"></i
      ></a>
      <a href="https://www.instagram.com/uesan_oficial/?hl=es" target="_blank"
        ><i class="bi bi-instagram text-dark"></i
      ></a>
    </div>

    <!-- Contenido principal -->
    <div class="main-content d-flex flex-column flex-grow-1">
      <!-- Encabezado -->
      <div
        class="header d-flex justify-content-between align-items-center px-4 py-3 border-bottom"
      >
        <div class="brand">
          <img src="../assets/logo.jpg" alt="Logo ESAN" class="logo-img" />
        </div>
        <button class="btn btn-login" @click="showModal = true">
          Iniciar sesión
        </button>
      </div>

      <!-- Centro con imagen -->
      <div
        class="center-content flex-grow-1 d-flex align-items-stretch justify-content-start p-0"
      >
        <div class="row w-100 h-100 m-0">
          <!-- Texto alineado a la izquierda -->
          <div class="col-6 d-flex align-items-center ps-5">
            <div class="text-block">
              <h1>AsistencIA</h1>
              <p>Porque cada presencia cuenta</p>
            </div>
          </div>

          <!-- Imagen en la mitad derecha -->
          <div class="col-6 p-0">
            <img
              src="../assets/home1.jpg"
              alt="Imagen institucional"
              class="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE INICIO DE SESIÓN -->
    <div v-if="showModal" class="custom-modal">
      <div class="custom-modal-content">
        <h5 class="mb-4 text-center">Iniciar sesión</h5>
        <form @submit.prevent="handleLogIn">
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              v-model="username"
              placeholder="Usuario"
              required
            />
          </div>
          <div class="mb-3 input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              v-model="password"
              placeholder="Contraseña"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="d-flex flex-column gap-2 mt-4">
            <button type="submit" class="btn btn-login w-100">Entrar</button>
            <button
              type="button"
              class="btn btn-secondary w-100"
              @click="showModal = false"
            >
              Cancelar
            </button>
          </div>

          <div class="text-end mt-2">
            <a
              href="#"
              class="text-decoration-none small text-muted link-olvido"
              @click.prevent="abrirRecuperarContrasena"
            >
              ¿Te olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL INFORMATIVO -->
    <div v-if="showModalRecuperar" class="custom-modal">
      <div class="custom-modal-content text-center">
        <h5 class="mb-3">¿Olvidaste tu contraseña?</h5>
        <p>
          Para restablecer tu contraseña, comunícate con el área de soporte
          académico al <strong>+51 987 654 321</strong>. Validarán tu identidad
          y te guiarán en el proceso de recuperación.
        </p>
        <button
          class="btn btn-login w-100 mt-4"
          @click="cerrarRecuperarContrasena"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Importamos el enrutador
import { LogIn, getAllUsers } from "../services/logInService";

export default {
  name: "LoginView",

  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const showModal = ref(false);
    const showPassword = ref(false);
    const showModalRecuperar = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const abrirRecuperarContrasena = () => {
      showModal.value = false;
      showModalRecuperar.value = true;
    };

    const cerrarRecuperarContrasena = () => {
      showModalRecuperar.value = false;
      showModal.value = true;
    };

    const handleLogIn = async () => {
      const datos = {
        usuario: username.value.trim().toLowerCase(),
        contrasena: password.value.trim().toLowerCase(),
      };

      try {
        const response = await LogIn(datos);
        if (response) {
          localStorage.setItem("userData", JSON.stringify(response));
          showModal.value = false;
          router.push("/home");
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      } catch (error) {
        alert("Error en el login.");
      }
    };

    return {
      username,
      password,
      router,
      showModal,
      showPassword,
      showModalRecuperar,
      handleLogIn,
      togglePasswordVisibility,
      abrirRecuperarContrasena,
      cerrarRecuperarContrasena,
    };
  },
};
</script>

<style>
:root {
  --color-rojo: #b40000;
  --color-rojo-hover: #910000;
  --color-blanco: #ffffff;
}
</style>
<style scoped>
.sidebar {
  width: 60px;
  background-color: var(--color-blanco);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 30px;
  border-right: 1px solid #ccc;
}

.sidebar a {
  margin: 15px 0;
  color: var(--color-rojo);
  font-size: 1.3em;
  text-decoration: none;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--color-blanco);
  border-bottom: 1px solid #ccc;
}

.logo-img {
  height: 60px;
  object-fit: contain;
}

.center-content {
  background-color: var(--color-rojo);
  color: white;
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
}

.text-block {
  display: flex;
  flex-direction: column;
}

.text-block h1 {
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 0.4em;
}

.text-block p {
  font-size: 1.4em;
  margin: 0;
}

.btn-login {
  background-color: var(--color-rojo);
  color: white;
  border: none;
}

.btn-login:hover {
  background-color: var(--color-rojo-hover);
  color: white;
}

.object-fit-cover {
  object-fit: cover;
}

.custom-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.custom-modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.5);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.btn-login {
  background-color: var(--color-rojo);
  color: white;
  border: none;
}

.btn-login:hover {
  background-color: var(--color-rojo-hover);
  color: white;
}

.link-olvido:hover {
  color: var(--color-rojo) !important;
  cursor: pointer;
}
</style>
