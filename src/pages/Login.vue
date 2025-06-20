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
        <button
          class="btn btn-login"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
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

    <!-- Modal de Login -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Iniciar sesión</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
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
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <button type="submit" class="btn btn-login w-100">Entrar</button>
            </form>
          </div>
        </div>
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
    const showPassword = ref(false); // Estado para controlar la visibilidad de la contraseña
    const router = useRouter(); // Inicializamos el enrutador

    const handleLogIn = async () => {
      if (!username.value.trim() || !password.value.trim()) {
        alert("Usuario y contraseña son requeridos.");
        return;
      }

      const datos = {
        usuario: username.value.trim().toLowerCase(),
        contrasena: password.value.trim().toLowerCase(),
      };

      try {
        const response = await LogIn(datos);
        localStorage.setItem("userData", JSON.stringify(response));
        if (response) {
          navigateToHome();
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      } catch (error) {
        alert("Hubo un problema con el login.");
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const navigateToHome = () => {
      router.push("/home");
    };

    return {
      username,
      password,
      showPassword,
      handleLogIn,
      togglePasswordVisibility,
      navigateToHome,
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
</style>
