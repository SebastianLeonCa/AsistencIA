<template>
  <div>
    <!-- Header -->
    <div class="header">
      <img src="../../assets/logo.jpg" alt="Logo ESAN" class="logo-img" />
      <button
        class="btn btn-logout"
        data-bs-toggle="modal"
        data-bs-target="#logoutModal"
      >
        Cerrar sesión
      </button>
    </div>

    <!-- Contenido -->
    <div class="container mt-4">
      <div class="row g-4 align-items-stretch">
        <!-- Columna izquierda -->
        <div class="col-md-6">
          <!-- Seleccionar Curso -->
          <div class="card shadow border-0 mb-4">
            <div class="card-header text-white bg-rojo">
              <h5 class="mb-0">
                <i class="bi bi-people-fill me-2"></i>Seleccionar Curso
              </h5>
            </div>
            <div class="card-body">
              <label for="cursoSelect" class="form-label">
                <i class="bi bi-mortarboard-fill me-1"></i>Seleccionar Curso
              </label>
              <select class="form-select" v-model="curso">
                <option disabled value="">Selecciona un curso</option>
                <option value="S01">S01 - Project Management</option>
                <option value="S02">S02 - Álgebra Lineal</option>
                <option value="S03">S03 - Tesis 1</option>
              </select>
            </div>
          </div>

          <!-- Seleccionar Fecha -->
          <div class="card shadow border-0 mb-4">
            <div class="card-header text-white bg-rojo">
              <h5 class="mb-0">
                <i class="bi bi-calendar-event me-2"></i>Seleccionar Fecha
              </h5>
            </div>
            <div class="card-body">
              <label for="fechaAsistencia" class="form-label"
                >Fecha de asistencia</label
              >
              <div class="input-group">
                <span class="input-group-text"
                  ><i class="bi bi-calendar3"></i
                ></span>
                <input
                  type="date"
                  class="form-control"
                  id="fechaAsistencia"
                  v-model="fecha"
                />
              </div>
            </div>
          </div>

          <!-- Subir Foto -->
          <div class="card shadow border-0">
            <div class="card-header text-white bg-rojo">
              <h5 class="mb-0">
                <i class="bi bi-upload me-2"></i>Subir Foto de Clase
              </h5>
            </div>
            <div class="card-body text-center">
              <div
                class="border border-2 border-dashed p-4 mb-3 rounded"
                style="border-color: #ced4da"
              >
                <i class="bi bi-camera fs-2 text-secondary"></i>
                <p class="mt-2 fw-bold">Sube una foto de la clase</p>
                <p class="text-muted small">
                  Arrastra una imagen o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  id="fotoClase"
                  class="form-control d-none"
                  accept="image/*"
                  @change="handleFileChange"
                />
                <label
                  for="fotoClase"
                  class="btn w-100 mt-2"
                  :style="{
                    backgroundColor: curso && fecha ? '#b40000' : 'grey',
                    color: 'white',
                    pointerEvents: curso && fecha ? 'auto' : 'none',
                  }"
                >
                  <i class="bi bi-upload me-2"></i>Seleccionar Foto
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha -->
        <div class="col-md-6 d-flex">
          <div class="card shadow border-0 w-100 equal-height">
            <div class="card-header text-white bg-rojo">
              <h5 class="mb-0">
                <i class="bi bi-people-fill me-2"></i>Lista de Asistencia
                <span class="fw-light">- {{ curso }}</span>
              </h5>
            </div>
            <div class="card-body overflow-auto" style="max-height: 560px">
              <div
                v-for="(estudiante, index) in estudiantes"
                :key="index"
                class="d-flex align-items-center justify-content-between p-3 mb-3 rounded border bg-white shadow-sm"
              >
                <div class="d-flex align-items-center">
                  <img
                    src="../../assets/placeholder.png"
                    class="rounded-circle me-3 avatar-img"
                    alt="Foto estudiante"
                  />
                  <div>
                    <strong>{{ estudiante }}</strong>
                  </div>
                </div>
                <div class="btn-group btn-spacing" role="group">
                  <button class="btn btn-success">
                    <i class="bi bi-check-lg"></i>
                  </button>
                  <button class="btn btn-outline-warning">
                    <i class="bi bi-clock-fill"></i>
                  </button>
                  <button class="btn btn-outline-danger">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal logout -->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">¿Cerrar sesión?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <p class="mb-4">¿Estás seguro de que deseas cerrar sesión?</p>
            <div class="d-flex gap-3">
              <button
                type="button"
                class="btn btn-secondary w-50"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <a href="/" class="btn btn-logout w-50 text-center">Sí</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const userData = localStorage.getItem("userData");

const leftDrawerOpen = ref(false);
const router = useRouter();

const curso = ref("");
const fecha = ref("");
const estudiantes = [
  "Elena Fernández",
  "Luis Pérez",
  "María Gómez",
  "Carlos Sánchez",
  "Lucía Torres",
  "Pedro Ramírez",
  "Andrea Martínez",
  "Jorge Díaz",
  "Camila Ríos",
];

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target.result.split(",")[1];
    console.log("📷 Imagen Base64:", base64);

    fetch("http://localhost:5000/subir-imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imagen: base64 }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Imagen enviada:", data))
      .catch((err) => console.error("❌ Error al enviar imagen:", err));
  };

  reader.readAsDataURL(file);
};

function goToSettings() {
  router.push({ path: "/homeAdmin/settings" });
}

function logout() {
  // Lógica adicional, como limpiar datos de sesión
  router.push("/"); // Redirige a la página de login
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
:root {
  --color-rojo: #b40000;
  --color-rojo-hover: #910000;
  --color-azul: #1e5bff;
  --color-mostaza: #d4a017;
}
</style>
<style scoped>
.bg-rojo {
  background-color: var(--color-rojo) !important;
}

.header {
  background-color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.logo-img {
  height: 80px;
  object-fit: contain;
}

.btn-logout {
  background-color: var(--color-rojo);
  color: white;
  border: none;
}

.btn-logout:hover {
  background-color: var(--color-rojo-hover);
  color: white;
}

.text-mostaza {
  color: var(--color-mostaza);
}

.border-dashed {
  border-style: dashed !important;
}

.btn-spacing > button {
  margin-left: 5px;
  margin-right: 5px;
}

.avatar-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
}

.equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
