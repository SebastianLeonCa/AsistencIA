<template>
  <div>
    <div class="botones-editar-eliminar">
      <q-btn
        @click="abrirFormularioCreacion"
        label="Crear Marca"
        class="crear-marca-button"
        color="red"
        icon="add_circle_outline"
      />
      <q-toggle
        v-model="mostrarActivos"
        label="Estado"
        color="green"
        class="activo-toggle"
        left-label
        @update:model-value="onToggleChange"
      />
    </div>
    <table v-if="marcas.length > 0" class="marcas-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Marca</th>
          <th>Estado</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marca in marcas" :key="marca.idMarca">
          <td>{{ marca.idMarca }}</td>
          <td>{{ marca.nombreMarca }}</td>
          <td>
            <q-btn
              @click="abrirDialogoEliminar(marca)"
              :label="mostrarActivos ? 'Desactivar' : 'Activar'"
              color="negative"
              flat
            />
          </td>
          <td>
            <q-btn
              @click="abrirFormularioEdicion(marca)"
              label="Editar"
              color="primary"
              icon="edit"
              flat
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="mostrarFormulario" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ esNuevoMarca ? "Crear Marca" : "Editar Marca" }}</h2>
        <form @submit.prevent="guardarCambios">
          <label for="nombre">Marca:</label>
          <input id="nombre" v-model="marcaTemporal.nombreMarca" type="text" />

          <button type="submit">Guardar</button>
          <button type="button" @click="cancelarEdicion">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
  <q-dialog v-model="mostrarDialogoEliminar">
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h6">
          ¿Estás seguro de {{ mostrarActivos ? "desactivar" : "activar" }} esta
          marca?
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="No" @click="cancelarEdicion" color="secondary" />
        <q-btn flat label="Sí" @click="eliminarMarca" color="negative" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import {
  getAllMarcasActive,
  getAllMarcasInactive,
  updateMarca,
  createMarca,
  deactivate,
  activate,
} from "../../../services/microServices/marcaService";

export default {
  name: "MarcaInfo",

  setup() {
    const marcas = ref([]);
    const marcaSeleccionado = ref(null);
    const marcaTemporal = reactive({});
    const mostrarFormulario = ref(false);
    const esNuevoMarca = ref(false);
    const mostrarDialogoEliminar = ref(false); // Variable para contmarcaar el pop-up
    const mostrarActivos = ref(true);

    const obtenerMarcas = async () => {
      try {
        marcas.value = mostrarActivos.value
          ? await getAllMarcasActive()
          : await getAllMarcasInactive();
      } catch (error) {
        console.error("Error al obtener la información de los marcas:", error);
      }
    };

    const abrirFormularioCreacion = () => {
      marcaSeleccionado.value = null;
      Object.assign(marcaTemporal, {
        nombreMarca: "",
        estado: true,
      });
      esNuevoMarca.value = true;
      mostrarFormulario.value = true;
    };

    const abrirFormularioEdicion = (marca) => {
      marcaSeleccionado.value = marca;
      Object.assign(marcaTemporal, { ...marca });
      esNuevoMarca.value = false;
      mostrarFormulario.value = true;
    };

    const guardarCambios = async () => {
      if (!marcaTemporal.nombreMarca) {
        alert(
          "Todos los campos son obligatorios. Por favor, complete todos los campos."
        );
        return;
      }
      try {
        if (esNuevoMarca.value) {
          const { idMarca, ...entidadSinId } = marcaTemporal; // Quitar campo ID
          await createMarca(entidadSinId);
        } else {
          await updateMarca(marcaTemporal);
        }
        await obtenerMarcas();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      } finally {
        mostrarFormulario.value = false;
      }
    };

    const cancelarEdicion = () => {
      marcaSeleccionado.value = null;
      mostrarFormulario.value = false;
      mostrarDialogoEliminar.value = false;
    };

    const abrirDialogoEliminar = (marca) => {
      marcaSeleccionado.value = marca;
      mostrarDialogoEliminar.value = true;
    };

    const eliminarMarca = async () => {
      try {
        if (marcaSeleccionado.value) {
          if (mostrarActivos.value) {
            await deactivate(marcaSeleccionado.value.idMarca);
          } else {
            await activate(marcaSeleccionado.value.idMarca);
          }
          await obtenerMarcas();
        }
      } catch (error) {
        console.error("Error al eliminar el marca:", error);
      } finally {
        mostrarDialogoEliminar.value = false;
      }
    };

    const onToggleChange = () => {
      obtenerMarcas();
      marcaSeleccionado.value = false;
    };

    onMounted(() => {
      obtenerMarcas();
    });

    return {
      marcas,
      marcaSeleccionado,
      marcaTemporal,
      mostrarFormulario,
      esNuevoMarca,
      mostrarDialogoEliminar, // Pasar la variable al template
      abrirFormularioCreacion,
      abrirFormularioEdicion,
      guardarCambios,
      cancelarEdicion,
      abrirDialogoEliminar,
      eliminarMarca,
      mostrarActivos,
      onToggleChange,
    };
  },
};
</script>

<style scoped>
/* Estilos generales de la tabla de marcas */
.marcas-table {
  width: 80%;
  margin-top: 40px;
  border-collapse: collapse;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
}

/* Estilo para los encabezados de la tabla de marcas */
.marcas-table th {
  background-color: #b91c1c; /* Rojo para el encabezado */
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  padding: 12px;
  text-align: center;
}

/* Estilo para las celdas de la tabla de marcas */
.marcas-table td {
  background-color: #f9fafb;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
  text-align: center;
}

/* Estilo para las filas alternadas en la tabla de marcas */
.marcas-table tr:nth-child(even) td {
  background-color: #e5e7eb;
}

/* Estilo para el hover de las filas en la tabla de marcas */
.marcas-table tr:hover td {
  background-color: #fddede; /* Rojo claro para hover */
}

/* Estilo para el cuadro de marca seleccionado */
.marca-seleccionado {
  margin-top: 50px;
  font-size: 18px;
  text-align: left;
}

/* Estilo para los botones de editar y eliminar */
.botones-editar-eliminar {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 18px;
  text-align: left;
  align-items: center;
}

/* Estilo para los botones de editar y eliminar */
.editar-button,
.eliminar-button {
  padding: 12px 24px;
  background-color: #1e3a8a; /* Azul para los botones */
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.editar-button:hover,
.eliminar-button:hover {
  background-color: #1d4ed8; /* Azul más oscuro para hover */
}

/* Estilo para el botón de crear marca */
.crear-marca-button {
  margin-left: 10%;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #e53e3e; /* Rojo para el botón de crear marca */
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.crear-marca-button:hover {
  background-color: #c53a3a; /* Rojo más oscuro para hover */
}

/* Modal de Crear/Editar Marca */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro con opacidad */
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
  z-index: 1000; /* Asegura que el modal esté encima de otros elementos */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidad */
  width: 80%;
  max-width: 600px;
  margin: 0 auto; /* Centra el formulario horizontalmente */
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* Hace que el contenido del formulario esté en columna */
  align-items: center;
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
  text-align: center; /* Centra el título */
}

/* Usamos Grid para dividir el formulario en 2 filas y 4 columnas */
.modal-content form {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas con igual tamaño */
  gap: 20px;
  width: 100%; /* Asegura que el formulario ocupe todo el ancho */
}

/* Estilo para las etiquetas */
.modal-content label {
  display: block;
  font-weight: bold;
  font-size: 16px;
  color: #555;
  display: flex;
  align-items: center;
}

/* Estilo para los campos de entrada (select y input) */
.modal-content select,
.modal-content input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

/* Estilo para los botones dentro del formulario */
.modal-content button {
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #e53e3e; /* Rojo para el botón */
  color: white;
  transition: background-color 0.3s ease;
}

/* Estilo para el toggle de estado activo */
.activo-toggle {
  margin-right: 8%;
  color: #af1712; /* Cambiar el color del texto o la etiqueta */
}

.activo-toggle .q-toggle__control {
  border: 2px solid #b91c1c; /* Cambiar el color del borde */
}

/* Para que los campos se ajusten bien en pantallas pequeñas */
@media (max-width: 768px) {
  .modal-content form {
    grid-template-columns: 1fr 1fr; /* En pantallas pequeñas, dos columnas */
  }
}

/* Para evitar el scroll cuando el modal esté abierto */
body.modal-open {
  overflow: hidden;
}
</style>
