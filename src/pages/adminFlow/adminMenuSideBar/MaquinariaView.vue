<template>
  <div>
    <div class="botones-editar-eliminar">
      <q-btn
        @click="abrirFormularioCreacion"
        label="Crear Maquinaria"
        class="crear-maquinaria-button"
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
    <table v-if="maquinarias.length > 0" class="maquinarias-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Marca</th>
          <th>Placa</th>
          <th>Modelo</th>
          <th>Horometro Compra</th>
          <th>Horometro Actual</th>
          <th>Tipo</th>
          <th>Año</th>
          <th>Estado</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="maquinaria in maquinarias" :key="maquinaria.idMaquinaria">
          <td>{{ maquinaria.idMaquinaria }}</td>
          <td>{{ maquinaria.nombreMarca }}</td>
          <td>{{ maquinaria.placa }}</td>
          <td>{{ maquinaria.modelo }}</td>
          <td>{{ maquinaria.horometroCompra }}</td>
          <td>{{ maquinaria.horometroActual }}</td>
          <td>{{ maquinaria.tipoMaquinaria }}</td>
          <td>{{ maquinaria.anoFabricacion }}</td>
          <td>
            <q-btn
              @click="abrirDialogoEliminar(maquinaria)"
              :label="mostrarActivos ? 'Desactivar' : 'Activar'"
              color="negative"
              flat
            />
          </td>
          <td>
            <q-btn
              @click="abrirFormularioEdicion(maquinaria)"
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
      <div class="modal-content" q-pa-md>
        <h2 class="text-center">
          {{ esNuevoMaquinaria ? "Crear Maquinaria" : "Editar Maquinaria" }}
        </h2>
        <form @submit.prevent="guardarCambios" class="q-gutter-md">
          <label for="opciones">Seleccione una Marca:</label>
          <select id="opciones" v-model="maquinariaTemporal.idMarca">
            <option
              v-for="marca in marcas"
              :key="marca.idMarca"
              :value="marca.idMarca"
            >
              {{ marca.nombreMarca }}
            </option>
          </select>

          <label for="placa">Placa:</label>
          <input id="placa" v-model="maquinariaTemporal.placa" type="text" />

          <label for="modelo">Modelo:</label>
          <input id="modelo" v-model="maquinariaTemporal.modelo" type="text" />

          <label for="horometroCompra">Horometro Compra:</label>
          <input
            id="horometroCompra"
            v-model="maquinariaTemporal.horometroCompra"
            type="text"
          />

          <label for="horometroActual">Horometro Actual:</label>
          <input
            id="horometroActual"
            v-model="maquinariaTemporal.horometroActual"
            type="text"
          />

          <label for="tipoMaquinaria">Tipo:</label>
          <input
            id="tipoMaquinaria"
            v-model="maquinariaTemporal.tipoMaquinaria"
            type="text"
          />

          <label for="anoFabricacion">Año Fabricacion:</label>
          <input
            id="anoFabricacion"
            v-model="maquinariaTemporal.anoFabricacion"
            type="number"
            min="1950"
            max="2100"
            step="1"
            placeholder="Año (ej: 2024)"
          />

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
          maquinaria?
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="No" @click="cancelarEdicion" color="secondary" />
        <q-btn flat label="Sí" @click="eliminarMaquinaria" color="negative" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import {
  getAllMaquinariasActive,
  getAllMaquinariasInactive,
  updateMaquinaria,
  createMaquinaria,
  deactivate,
  activate,
} from "../../../services/RegistroDataRepository/maquinariaService";

import { getAllMarcasActive } from "../../../services/RegistroDataRepository/marcaService";

export default {
  name: "MaquinariaInfo",

  setup() {
    const maquinarias = ref([]);
    const maquinariaSeleccionado = ref(null);
    const maquinariaTemporal = reactive({});
    const mostrarFormulario = ref(false);
    const esNuevoMaquinaria = ref(false);
    const mostrarDialogoEliminar = ref(false); // Variable para controlar el pop-up
    const mostrarActivos = ref(true);
    const marcas = ref([]);

    const obtenerMarcas = async () => {
      try {
        marcas.value = await getAllMarcasActive();
      } catch (error) {
        console.error("Error al obtener la información de las marcas:", error);
      }
    };

    const obtenerMaquinarias = async () => {
      try {
        if (mostrarActivos.value) {
          maquinarias.value = await getAllMaquinariasActive();
        } else {
          maquinarias.value = await getAllMaquinariasInactive();
        }
      } catch (error) {
        console.error(
          "Error al obtener la información de los maquinarias:",
          error
        );
      }
    };

    const abrirFormularioCreacion = () => {
      maquinariaSeleccionado.value = null;
      Object.assign(maquinariaTemporal, {
        idMarca: 0,
        nombreMarca: "",
        modelo: "",
        placa: "",
        horometroActual: 0,
        horometroCompra: 0,
        tipoMaquinaria: "",
        anoFabricacion: 2024,
        estado: true,
      });
      esNuevoMaquinaria.value = true;
      mostrarFormulario.value = true;
    };

    const abrirFormularioEdicion = (maquinaria) => {
      Object.assign(maquinariaTemporal, { ...maquinaria });
      esNuevoMaquinaria.value = false;
      mostrarFormulario.value = true;
    };

    const abrirDialogoEliminar = (maquinaria) => {
      maquinariaSeleccionado.value = maquinaria; // Asigna el cliente seleccionado
      mostrarDialogoEliminar.value = true; // Muestra el diálogo
    };

    const validarPlaca = (placa) => {
      const regex = /^[A-Za-z]{3}-\d{4}$/; // Expresión regular para validar el formato KND-5768
      return regex.test(placa);
    };

    const validarCamposVacios = () => {
      // Verifica si algún campo obligatorio está vacío
      return (
        !maquinariaTemporal.idMarca ||
        !maquinariaTemporal.placa ||
        !maquinariaTemporal.modelo ||
        !maquinariaTemporal.horometroCompra ||
        !maquinariaTemporal.horometroActual ||
        !maquinariaTemporal.tipoMaquinaria ||
        !maquinariaTemporal.anoFabricacion
      );
    };

    const guardarCambios = async () => {
      // Verificar si algún campo obligatorio está vacío
      if (validarCamposVacios()) {
        alert("Por favor, complete todos los campos antes de guardar.");
        return; // Detener el proceso si hay campos vacíos
      }

      // Validar el formato de la placa
      if (!validarPlaca(maquinariaTemporal.placa)) {
        alert(
          "La placa no tiene el formato correcto. Debe ser en el formato ABC-1234."
        );
        return; // Detener el proceso si la placa no es válida
      }

      try {
        delete maquinariaTemporal.nombreMarca;
        if (esNuevoMaquinaria.value) {
          const { idMaquinaria, ...entidadSinId } = maquinariaTemporal;
          await createMaquinaria(entidadSinId); // Crear nueva maquinaria
        } else {
          await updateMaquinaria(maquinariaTemporal); // Actualizar maquinaria existente
        }
        maquinariaSeleccionado.value = false; // Desmarcar la maquinaria seleccionada
        await obtenerMaquinarias(); // Obtener la lista actualizada de maquinarias
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      } finally {
        mostrarFormulario.value = false; // Cerrar el formulario
      }
    };

    const cancelarEdicion = () => {
      mostrarFormulario.value = false;
      mostrarDialogoEliminar.value = false;
    };

    const eliminarMaquinaria = async () => {
      try {
        if (mostrarActivos.value) {
          await deactivate(maquinariaSeleccionado.value.idMaquinaria);
        } else {
          await activate(maquinariaSeleccionado.value.idMaquinaria);
        }
        await obtenerMaquinarias();
      } catch (error) {
        console.error("Error al eliminar el maquinaria:", error);
      } finally {
        mostrarDialogoEliminar.value = false;
      }
    };

    const onToggleChange = (value) => {
      obtenerMaquinarias();
    };

    onMounted(() => {
      obtenerMaquinarias();
      obtenerMarcas();
    });

    return {
      maquinarias,
      maquinariaSeleccionado,
      maquinariaTemporal,
      mostrarFormulario,
      esNuevoMaquinaria,
      mostrarDialogoEliminar, // Pasar la variable al template
      abrirFormularioCreacion,
      abrirFormularioEdicion,
      guardarCambios,
      cancelarEdicion,
      eliminarMaquinaria,
      mostrarActivos,
      onToggleChange,
      deactivate,
      activate,
      getAllMarcasActive,
      obtenerMarcas,
      marcas,
      abrirDialogoEliminar,
    };
  },
};
</script>

<style scoped>
/* Estilo para la tabla de maquinarias */
.maquinarias-table {
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

.maquinarias-table th {
  background-color: #b91c1c; /* Rojo para el encabezado */
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  padding: 12px;
  text-align: center;
}

.maquinarias-table td {
  background-color: #f9fafb;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
  text-align: center;
}

.maquinarias-table tr:nth-child(even) td {
  background-color: #f3f4f6;
}

.maquinarias-table tr:hover td {
  background-color: #fddede; /* Rojo claro para hover */
}

/* Estilo para el cuadro de maquinaria seleccionada */
.maquinaria-seleccionado {
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

.crear-maquinaria-button {
  margin-left: 10%;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #e53e3e; /* Rojo para el botón de crear */
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Estilos para el formulario de crear/editar maquinaria */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidad */
  width: 80%;
  max-width: 900px;
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

/* Para que los campos se ajusten bien en pantallas pequeñas */
@media (max-width: 768px) {
  .modal-content form {
    grid-template-columns: 1fr 1fr; /* En pantallas pequeñas, dos columnas */
  }
}
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
  z-index: 999; /* Asegura que el formulario esté encima de otros elementos */
}

.activo-toggle {
  margin-right: 8%;
  color: #af1712; /* Cambiar el color del texto o la etiqueta */
}

.activo-toggle .q-toggle__control {
  border: 2px solid #b91c1c; /* Cambiar el color del borde */
}
</style>
