<template>
  <div>
    <div class="botones-editar-eliminar">
      <q-btn
        @click="abrirFormularioCreacion"
        label="Crear Personal"
        class="crear-personal-button"
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
    <table v-if="personals.length > 0" class="personals-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Rol</th>
          <th>DNI</th>
          <th>Telefono</th>
          <th>Correo Electronico</th>
          <th>Direccion</th>
          <th>F. Ingreso</th>
          <th>F. Nacimiento</th>
          <th>Estado</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="personal in personals" :key="personal.idPersonal">
          <td>{{ personal.idPersonal }}</td>
          <td>{{ personal.nombre }}</td>
          <td>{{ personal.apellido }}</td>
          <td>{{ personal.descripcionRol }}</td>
          <td>{{ personal.dni }}</td>
          <td>{{ personal.telefono }}</td>
          <td>{{ personal.correoElectronico }}</td>
          <td>{{ personal.direccion }}</td>
          <td>{{ personal.fechaIngreso }}</td>
          <td>{{ personal.fechaNacimiento }}</td>
          <td>
            <q-btn
              @click="abrirDialogoEliminar(personal)"
              :label="mostrarActivos ? 'Desactivar' : 'Activar'"
              color="negative"
              flat
            />
          </td>
          <td>
            <q-btn
              @click="abrirFormularioEdicion(personal)"
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
        <h2>
          {{ esNuevoPersonal ? "Crear Personal" : "Editar Personal" }}
        </h2>
        <form @submit.prevent="guardarCambios">
          <label for="opciones">Seleccione un Rol:</label>
          <select id="opciones" v-model="personalTemporal.idRol">
            <option v-for="rol in rols" :key="rol.idRol" :value="rol.idRol">
              {{ rol.descripcionRol }}
            </option>
          </select>

          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="personalTemporal.nombre" type="text" />

          <label for="apellido">Apellido:</label>
          <input
            id="apellido"
            v-model="personalTemporal.apellido"
            type="text"
          />

          <label for="dni">DNI:</label>
          <input id="dni" v-model="personalTemporal.dni" type="text" />

          <label for="telefono">Telefono:</label>
          <input
            id="telefono"
            v-model="personalTemporal.telefono"
            type="text"
          />

          <label for="correoElectronico">Correo Electronico:</label>
          <input
            id="correoElectronico"
            v-model="personalTemporal.correoElectronico"
            type="email"
          />

          <label for="direccion">Direccion:</label>
          <input
            id="direccion"
            v-model="personalTemporal.direccion"
            type="text"
          />

          <label for="fechaIngreso">Fecha Ingreso:</label>
          <input
            id="fechaIngreso"
            v-model="personalTemporal.fechaIngreso"
            type="date"
          />

          <label for="fechaNacimiento">Fecha Nacimiento:</label>
          <input
            id="fechaNacimiento"
            v-model="personalTemporal.fechaNacimiento"
            type="date"
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
          personal?
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="No" @click="cancelarEdicion" color="secondary" />
        <q-btn flat label="Sí" @click="eliminarPersonal" color="negative" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import {
  getAllPersonalsActive,
  getAllPersonalsInactive,
  updatePersonal,
  createPersonal,
  deactivate,
  activate,
} from "../../../services/microServices/personalService";

import { getAllRolsActive } from "../../../services/microServices/docenteService";

export default {
  name: "PersonalInfo",

  setup() {
    const personals = ref([]);
    const personalTemporal = reactive({});
    const mostrarFormulario = ref(false);
    const esNuevoPersonal = ref(false);
    const mostrarDialogoEliminar = ref(false); // Variable para controlar el pop-up
    const mostrarActivos = ref(true);
    const rols = ref([]);
    const statusPersonal = ref(false);
    const personalSeleccionado = ref(null);

    const obtenerRols = async () => {
      try {
        rols.value = await getAllRolsActive();
      } catch (error) {
        console.error("Error al obtener la información de las rols:", error);
      }
    };

    const obtenerPersonals = async () => {
      try {
        if (mostrarActivos.value) {
          personals.value = await getAllPersonalsActive();
        } else {
          personals.value = await getAllPersonalsInactive();
        }
      } catch (error) {
        console.error(
          "Error al obtener la información de los personals:",
          error
        );
      }
    };

    const abrirFormularioCreacion = () => {
      personalSeleccionado.value = null;
      Object.assign(personalTemporal, {
        idRol: 0,
        descripcionRol: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        correoElectronico: "",
        direccion: "",
        fechaIngreso: "",
        fechaNacimiento: "",
        estado: true,
      });
      esNuevoPersonal.value = true;
      mostrarFormulario.value = true;
    };

    const abrirFormularioEdicion = (personal) => {
      Object.assign(personalTemporal, { ...personal });
      esNuevoPersonal.value = false;
      mostrarFormulario.value = true;
    };

    const abrirDialogoEliminar = (personal) => {
      personalSeleccionado.value = personal; // Asigna el cliente seleccionado
      mostrarDialogoEliminar.value = true; // Muestra el diálogo
    };

    const validarDni = (dni) => {
      const dniPattern = /^\d{8}$/; // Valida que el DNI tenga exactamente 8 dígitos
      return dniPattern.test(dni);
    };

    const validarTelefono = (telefono) => {
      const telefonoPattern = /^\d{9}$/; // Valida que el teléfono tenga exactamente 9 dígitos
      return telefonoPattern.test(telefono);
    };

    const validarCamposVacios = () => {
      // Verifica si algún campo obligatorio está vacío
      return (
        !personalTemporal.idRol ||
        !personalTemporal.nombre ||
        !personalTemporal.apellido ||
        !personalTemporal.dni ||
        !personalTemporal.telefono ||
        !personalTemporal.correoElectronico ||
        !personalTemporal.direccion ||
        !personalTemporal.fechaIngreso ||
        !personalTemporal.fechaNacimiento
      );
    };

    const guardarCambios = async () => {
      // Verificar si algún campo obligatorio está vacío
      if (validarCamposVacios()) {
        alert("Por favor, complete todos los campos antes de guardar.");
        return; // Detener el proceso si hay campos vacíos
      }

      // Validar DNI antes de guardar
      if (!validarDni(personalTemporal.dni)) {
        alert("El DNI debe tener exactamente 8 dígitos.");
        return; // Detener el proceso si la validación falla
      }

      // Validar teléfono antes de guardar
      if (!validarTelefono(personalTemporal.telefono)) {
        alert("El teléfono debe tener exactamente 9 dígitos.");
        return; // Detener el proceso si la validación falla
      }

      try {
        if (esNuevoPersonal.value) {
          const { idPersonal, ...entidadSinId } = personalTemporal;
          await createPersonal(entidadSinId);
        } else {
          await updatePersonal(personalTemporal);
        }
        await obtenerPersonals();
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
      } finally {
        mostrarFormulario.value = false;
      }
    };

    const cancelarEdicion = () => {
      mostrarFormulario.value = false;
      mostrarDialogoEliminar.value = false;
    };

    const eliminarPersonal = async () => {
      try {
        if (mostrarActivos.value) {
          await deactivate(personalSeleccionado.value.idPersonal);
        } else {
          await activate(personalSeleccionado.value.idPersonal);
        }
        await obtenerPersonals();
      } catch (error) {
        console.error("Error al eliminar el personal:", error);
      } finally {
        mostrarDialogoEliminar.value = false;
      }
    };

    const onToggleChange = (value) => {
      obtenerPersonals();
    };

    onMounted(() => {
      obtenerPersonals();
      obtenerRols();
    });

    return {
      personals,
      personalSeleccionado,
      personalTemporal,
      mostrarFormulario,
      esNuevoPersonal,
      mostrarDialogoEliminar, // Pasar la variable al template
      abrirFormularioCreacion,
      abrirFormularioEdicion,
      guardarCambios,
      cancelarEdicion,
      eliminarPersonal,
      mostrarActivos,
      onToggleChange,
      deactivate,
      activate,
      getAllRolsActive,
      obtenerRols,
      rols,
      abrirDialogoEliminar,
    };
  },
};
</script>

<style scoped>
/* Estilos generales de la tabla de personales */
.personals-table {
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

/* Estilo para los encabezados de la tabla de personales */
.personals-table th {
  background-color: #b91c1c; /* Rojo para el encabezado */
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  padding: 12px;
  text-align: center;
}

/* Estilo para las celdas de la tabla de personales */
.personals-table td {
  background-color: #f9fafb;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
  text-align: center;
}

/* Estilo para las filas alternadas en la tabla de personales */
.personals-table tr:nth-child(even) td {
  background-color: #e5e7eb;
}

/* Estilo para el hover de las filas en la tabla de personales */
.personals-table tr:hover td {
  background-color: #fddede; /* Rojo claro para hover */
}

/* Estilo para el cuadro de personal seleccionado */
.personal-seleccionado {
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

/* Estilo para el botón de crear personal */
.crear-personal-button {
  margin-left: 10%;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #e53e3e; /* Rojo para el botón de crear personal */
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.crear-personal-button:hover {
  background-color: #c53a3a; /* Rojo más oscuro para hover */
}

/* Modal de Crear/Editar Personal */
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
  max-width: 1000px;
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
