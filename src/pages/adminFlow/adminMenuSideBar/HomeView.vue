<template>
  <!-- Imagen grande al inicio, solo si estamos en la página de inicio -->
  <div v-if="isOnHomePage" class="hero-image">
    <img src="src/assets/logoPromcoser.png" alt="Imagen de empresa" />
  </div>
   <!-- Carrusel de imágenes -->
  <div v-if="isOnHomePage" class="carousel-container">
    <div class="carousel">
      <img src="src/assets/maquinaria.jpg" alt="Imagen 1" />
      <img src="src/assets/maquinaria1.jpg" alt="Imagen 1" />
      <img src="src/assets/maquinaria2.jpg" alt="Imagen 2" />
      <img src="src/assets/maquinaria4.jpg" alt="Imagen 3" />
      <!-- Agrega más imágenes según sea necesario -->
    </div>

    <!-- Controles de navegación -->
    <div class="carousel-controls">
      <button class="prev" @click="moveSlide(-1)">&#10094;</button>
      <button class="next" @click="moveSlide(1)">&#10095;</button>
    </div>
  </div>
  <!-- Mostrar información estática en la página de inicio -->

  <div v-if="isOnHomePage" class="company-info">
    <h2 class="centered-title">Información de la Empresa</h2>

    <!-- Card de Clientes Activos -->
    <div style="display: flex; justify-content: center; gap: 20px">
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#412f95',
          border: '2px solid #412f95',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Clientes Activos
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ clientCount }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Card de Clientes Inactivos -->
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#7875f4',
          border: '2px solid #7875f4',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Clientes Inactivos
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ inactiveClientCount }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Card de Maquinaria Activa -->
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#ffb601',
          border: '2px solid #ffb601',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Maquinaria Activa
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ machineryActiveCount }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Card de Maquinaria Inactiva -->
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#ff7f05',
          border: '2px solid #ff7f05',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Maquinaria Inactiva
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ machineryInactiveCount }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Card de Personal Activo -->
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#ff2600',
          border: '2px solid #ff2600',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Personal Activo
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ personnelActiveCount }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Card de Personal Inactivo -->
      <q-card
        class="q-mb-md"
        :style="{
          maxWidth: '300px',
          margin: '20px auto',
          backgroundColor: '#9b0b0b',
          border: '2px solid #9b0b0b',
        }"
      >
        <q-card-section>
          <div class="text-h6" style="text-align: center; font-weight: bold; color: #ffffff;">
            Personal Inactivo
          </div>
          <div
            class="q-mt-md"
            style="text-align: center; font-size: 24px; font-weight: 600; color: #ffffff;"
          >
            {{ personnelInactiveCount }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="info-general">
    <div v-if="isOnHomePage" class="company-info1">
      <h2 class="centered-title">Valores de la Empresa</h2>

      <!-- Contenedor para dos columnas -->
      <q-row class="q-gutter-md" style="display: flex; justify-content: center">
        <!-- Columna para los valores de la empresa -->
        <q-col cols="12" sm="6">
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#3d8351',
              border: '2px solid #3d8351',
              borderRadius: '50%', /* Esto hace que sea redondo */
            }"
          >
          <q-card class="q-mb-md card-redonda">
            <q-card-section>
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Calidad
              </div>
              <div style="text-align: center; font-size: 16px">
                Brindar siempre la mejor calidad a nuestros clientes es nuestra
                prioridad.
              </div>
            </q-card-section>
          </q-card>
        </q-card>
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#b1c765',
              border: '2px solid #b1c765',
              borderRadius: '50%',
            }"
          >
          <q-card class="q-mb-md card-redonda">
            <q-card-section>
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Compromiso
              </div>
              <div style="text-align: center; font-size: 16px">
                Nos comprometemos a cumplir con los plazos y requisitos
                acordados.
              </div>
            </q-card-section>
          </q-card>
        </q-card>
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#f06433',
              border: '2px solid #f06433',
              borderRadius: '50%',
            }"
          >
          <q-card class="q-mb-md card-redonda">
            <q-card-section>
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Liderazgo
              </div>
              <div style="text-align: center; font-size: 16px">
                Lideramos el mercado peruano en la ejecución de obras de
                ingeniería
              </div>
            </q-card-section>
          </q-card>
        </q-card>
        </q-col>

        <!-- Columna para los correos de los contactos de la empresa -->
        <q-col cols="12" sm="6">
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#256035',
              border: '2px solid #256035',
              borderRadius: '50%',
            }"
          >
          <q-card class="q-mb-md card-redonda">
            <q-card-section>
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Trabajo en equipo
              </div>
              <div style="text-align: center; font-size: 16px">
                Fomentamos la colaboración, aprovechando el talento de cada miembro
                para alcanzar objetivos comunes.
              </div>
            </q-card-section>
          </q-card>
        </q-card>

          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#ffde59',
              border: '2px solid #ffde59',
              borderRadius: '50%',
            }"
          >
          <q-card class="q-mb-md card-redonda">
            <q-card-section>
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Innovación
              </div>
              <div style="text-align: center; font-size: 16px">
                Promovemos un ambiente donde la creatividad y las nuevas ideas
                son siempre bienvenidas.
              </div>
            </q-card-section>
          </q-card>
        </q-card>
        </q-col>
      </q-row>
    </div>

    <div v-if="isOnHomePage" class="company-info2">
      <h2 class="centered-title">Contactos</h2>

      <!-- Contenedor para dos columnas -->
      <!-- Contenedor para dos columnas -->
      <q-row class="q-gutter-md" style="display: flex; justify-content: center">
        <!-- Columna para los valores de la empresa -->
        <q-col cols="12" sm="6">
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#e3f2fd',
              border: '2px solid #12afa1',
            }"
          >
            <q-card-section>
               <!-- Ícono centrado -->
            <q-icon name="build" size="40px" color="primary" style="display: block; margin: 0 auto;" />
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Mantenimiento
              </div>
              <div style="text-align: center; font-size: 16px">
                manten@promcoser.com
              </div>
            </q-card-section>
          </q-card>

          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#e3f2fd',
              border: '2px solid #12afa1',
            }"
          >
            <q-card-section>
              <q-icon name="business" size="40px" color="primary" style="display: block; margin: 0 auto;" />
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Comercial
              </div>
              <div style="text-align: center; font-size: 16px">
                comercial@promcoser.com
              </div>
            </q-card-section>
          </q-card>

          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#e3f2fd',
              border: '2px solid #12afa1',
            }"
          >
            <q-card-section>
              <q-icon name="inventory" size="40px" color="primary" style="display: block; margin: 0 auto;" />
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Inventario
              </div>
              <div style="text-align: center; font-size: 16px">
                inventario@promcoser.com
              </div>
            </q-card-section>
          </q-card>
        </q-col>
        <q-col cols="12" sm="6">
          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#e3f2fd',
              border: '2px solid #12afa1',
            }"
          >
            <q-card-section>
              <q-icon name="contact_mail" size="40px" color="primary" style="display: block; margin: 0 auto;" />
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Contacto RR.HH
              </div>
              <div style="text-align: center; font-size: 16px">
                rrhh@promcoser.com
              </div>
            </q-card-section>
          </q-card>

          <q-card
            class="q-mb-md"
            :style="{
              maxWidth: '300px',
              margin: '20px auto',
              backgroundColor: '#e3f2fd',
              border: '2px solid #12afa1',
            }"
          >
            <q-card-section>
              <q-icon name="support_agent" size="40px" color="primary" style="display: block; margin: 0 auto;" />
              <div
                class="text-h6"
                style="text-align: center; font-weight: bold"
              >
                Soporte Técnico
              </div>
              <div style="text-align: center; font-size: 16px">
                soporte@promcoser.com
              </div>
            </q-card-section>
          </q-card>
        </q-col>
      </q-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getInfoGeneralResumen } from "src/services/RegistroDataRepository/infoGeneral.js"; // Importamos la función del servicio
import EssentialLink from "src/components/MenuSidebar.vue";

// Estado para almacenar la cantidad de clientes activos, inactivos, maquinaria y personal
const clientCount = ref(0);
const inactiveClientCount = ref(0);
const machineryActiveCount = ref(0);
const machineryInactiveCount = ref(0);
const personnelActiveCount = ref(0);
const personnelInactiveCount = ref(0);

// Función para obtener los datos generales
const fetchClientData = async () => {
  try {
    const data = await getInfoGeneralResumen(); // Llamada al servicio para obtener los datos generales
    clientCount.value = data.cliente.activo; // Asignar la cantidad de clientes activos
    inactiveClientCount.value = data.cliente.inactivo; // Asignar la cantidad de clientes inactivos

    // Asignar la cantidad de maquinaria activa e inactiva
    machineryActiveCount.value = data.maquinaria.activo;
    machineryInactiveCount.value = data.maquinaria.inactivo;

    // Asignar la cantidad de personal activo e inactivo
    personnelActiveCount.value = data.personal.activo;
    personnelInactiveCount.value = data.personal.inactivo;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

// Llamar a la función cuando el componente se monta
onMounted(() => {
  fetchClientData();
});

// Datos de la sesión
const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false);

// Computed para verificar si estamos en la página de inicio
const isOnHomePage = computed(() => route.path === "/homeAdmin");

function goToHome() {
  router.push({ path: "/homeAdmin" });
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  // Lógica adicional, como limpiar datos de sesión
  router.push("/"); // Redirige a la página de login
}

// Lista de enlaces del menú
const linksList = [
  { title: "Personal", icon: "group", link: "/homeAdmin/personal" },
  { title: "Maquinaria", icon: "construction", link: "/homeAdmin/maquinaria" },
  { title: "Cliente", icon: "business", link: "/homeAdmin/cliente" },
  { title: "Rol", icon: "security", link: "/homeAdmin/rol" },
  {
    title: "Lugar de Trabajo",
    icon: "location_on",
    link: "/homeAdmin/lugarTrabajo",
  },
  { title: "Marca", icon: "directions_car", link: "/homeAdmin/marca" },
];

// Variables reactivas
const currentIndex = ref(0);
const isOnHomePageVisible = ref(true); // Controla la visibilidad del carrusel

// Método para mover el carrusel
function moveSlide(step) {
  const slides = document.querySelectorAll('.carousel img');
  const totalSlides = slides.length;

  currentIndex.value += step;

  if (currentIndex.value < 0) {
    currentIndex.value = totalSlides - 1; // Si llega al primer slide, ir al último
  } else if (currentIndex.value >= totalSlides) {
    currentIndex.value = 0; // Si llega al último slide, volver al primero
  }

  const carousel = document.querySelector('.carousel');
  const offset = -currentIndex.value * 100; // Mueve el carrusel al siguiente slide

  carousel.style.transform = `translateX(${offset}%)`;
}
</script>

<style scoped>
.hero-image {
  text-align: center;
  margin-top: 20px;
}

.hero-image img {
  max-width: 70%;
  height: auto;
}

.middle-image {
  margin-top: 30px;
  text-align: center;
}

.middle-image img {
  max-width: 55%;
  height: auto;
  margin-bottom: 20px;
}

.centered-title {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: red;
}

.info-general {
  display: flex;
  justify-content: space-between;
}
.company-info2 {
  width: 50%;
}

.company-info1 {
  width: 50%;
}

/* Estilos para el contenedor del carrusel */
.carousel-container {
  max-width: 70%;
  overflow: hidden; /* Oculta las imágenes que se salen del contenedor */
  margin: 0 auto;
  position: relative;
}

/* Contenedor de las imágenes */
.carousel {
  display: flex;
  transition: transform 0.3s ease;
  gap: 10px; /* Espacio entre las imágenes */
}

/* Estilo para cada imagen */
.carousel img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Asegura que las imágenes se ajusten bien sin distorsión */
  transition: transform 0.3s ease; /* Efecto de agrandar/achicar */
  flex: 0 0 auto; /* Evita que las imágenes se estiren o se achiquen */
  border-radius: 8px; /* Opcional: agrega bordes redondeados */
}

/* Efecto de agrandar al pasar el cursor */
.carousel img:hover {
  transform: scale(1.1);
}

/* Controles de navegación */
.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-controls button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-controls button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.card-redonda {
  border-radius: 50%; /* Hace que el elemento sea circular */
  width: 300px; /* Ajusta ancho y alto */
  height: 140px; /* Para mantener la proporción y hacerlo perfectamente redondo */
  overflow: hidden; /* Opcional, para que el contenido no sobresalga */
}
</style>
