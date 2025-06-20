<template>
  <div>
    <div class="botones-editar-eliminar">
      <q-btn
        @click="abrirFormularioCreacion"
        label="Crear Cliente"
        class="crear-cliente-button"
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
    <table v-if="clientes.length > 0" class="clientes-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Razón Social</th>
          <th>RUC</th>
          <th>Teléfono</th>
          <th>Correo Electrónico</th>
          <th>Dirección</th>
          <th>Estado</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.idCliente">
          <td>{{ cliente.idCliente }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.razonSocial }}</td>
          <td>{{ cliente.ruc }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.correoElectronico }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>
            <q-btn
              @click="abrirDialogoEliminar(cliente)"
              :label="mostrarActivos ? 'Desactivar' : 'Activar'"
              color="negative"
              flat
            />
          </td>
          <td>
            <q-btn
              @click="abrirFormularioEdicion(cliente)"
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
        <h2>{{ esNuevoCliente ? "Crear Cliente" : "Editar Cliente" }}</h2>
        <form @submit.prevent="guardarCambios">
          <label for="nombre">Nombre:</label>
          <input id="nombre" v-model="clienteTemporal.nombre" type="text" />

          <label for="apellido">Apellido:</label>
          <input id="apellido" v-model="clienteTemporal.apellido" type="text" />

          <label for="razonSocial">Razón Social:</label>
          <input
            id="razonSocial"
            v-model="clienteTemporal.razonSocial"
            type="text"
          />

          <label for="ruc">RUC:</label>
          <input id="ruc" v-model="clienteTemporal.ruc" type="text" />

          <label for="correoElectronico">Correo Electrónico:</label>
          <input
            id="correoElectronico"
            v-model="clienteTemporal.correoElectronico"
            type="email"
          />

          <label for="telefono">Teléfono:</label>
          <input id="telefono" v-model="clienteTemporal.telefono" type="tel" />

          <label for="direccion">Dirección:</label>
          <input
            id="direccion"
            v-model="clienteTemporal.direccion"
            type="text"
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
          ¿Estás seguro de {{ mostrarActivos ? "desactivar" : "activar" }} este
          cliente?
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="No" @click="cancelarEdicion" color="secondary" />
        <q-btn flat label="Sí" @click="eliminarCliente" color="negative" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import {
  getAllClientesActive,
  getAllClientesInactive,
  updateCliente,
  createCliente,
  deactivate,
  activate,
} from "../../../services/RegistroDataRepository/clienteService";

export default {
  name: "ClienteInfo",

  setup() {
    const clientes = ref([]);
    const clienteTemporal = reactive({});
    const mostrarFormulario = ref(false);
    const esNuevoCliente = ref(false);
    const mostrarDialogoEliminar = ref(false); // Variable para controlar el pop-up
    const mostrarActivos = ref(true);
    const statusCliente = ref(false);
    const clienteSeleccionado = ref(null);

    const obtenerClientes = async () => {
      try {
        if (mostrarActivos.value) {
          clientes.value = await getAllClientesActive();
        } else {
          clientes.value = await getAllClientesInactive();
        }
      } catch (error) {
        console.error(
          "Error al obtener la información de los clientes:",
          error
        );
      }
    };

    const abrirFormularioCreacion = () => {
      Object.assign(clienteTemporal, {
        nombre: "",
        apellido: "",
        razonSocial: "",
        correoElectronico: "",
        telefono: "",
        direccion: "",
        ruc: "",
        estado: true,
      });
      esNuevoCliente.value = true;
      mostrarFormulario.value = true;
    };

    const abrirFormularioEdicion = (cliente) => {
      Object.assign(clienteTemporal, { ...cliente });
      esNuevoCliente.value = false;
      mostrarFormulario.value = true;
    };

    const abrirDialogoEliminar = (cliente) => {
      clienteSeleccionado.value = cliente; // Asigna el cliente seleccionado
      mostrarDialogoEliminar.value = true; // Muestra el diálogo
    };

    const validarRUC = (ruc) => {
      // Comprobamos si el RUC tiene 11 dígitos
      const rucPattern = /^[0-9]{11}$/;
      if (!rucPattern.test(ruc)) {
        return false;
      }
      return true;
    };

    const guardarCambios = async () => {
      // Validar que todos los campos estén completos
      if (
        !clienteTemporal.nombre ||
        !clienteTemporal.apellido ||
        !clienteTemporal.razonSocial ||
        !clienteTemporal.ruc ||
        !clienteTemporal.correoElectronico ||
        !clienteTemporal.telefono ||
        !clienteTemporal.direccion
      ) {
        alert(
          "Todos los campos son obligatorios. Por favor, complete todos los campos."
        );
        return; // Detener la ejecución si algún campo está vacío
      }

      // Validar RUC antes de guardar
      if (!validarRUC(clienteTemporal.ruc)) {
        alert("El RUC ingresado no es válido. Debe tener 11 dígitos.");
        return; // Detener la ejecución si el RUC no es válido
      }
      try {
        if (esNuevoCliente.value) {
          const { idCliente, ...entidadSinId } = clienteTemporal;
          console.log("Crear nuevo cliente", entidadSinId);
          await createCliente(entidadSinId);
        } else {
          await updateCliente(clienteTemporal);
        }
        await obtenerClientes();
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

    const eliminarCliente = async () => {
      try {
        if (mostrarActivos.value) {
          await deactivate(clienteSeleccionado.value.idCliente);
        } else {
          await activate(clienteSeleccionado.value.idCliente);
        }
        await obtenerClientes();
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
      } finally {
        mostrarDialogoEliminar.value = false; // Cierra el diálogo
      }
    };

    const onToggleChange = (value) => {
      obtenerClientes();
    };

    onMounted(() => {
      obtenerClientes();
    });

    return {
      clientes,
      clienteTemporal,
      mostrarFormulario,
      esNuevoCliente,
      abrirFormularioCreacion,
      abrirFormularioEdicion,
      guardarCambios,
      cancelarEdicion,
      eliminarCliente,
      mostrarActivos,
      onToggleChange,
      deactivate,
      activate,
      statusCliente,
      clienteSeleccionado,
      mostrarDialogoEliminar,
      abrirDialogoEliminar,
    };
  },
};
</script>

<style scoped>
/* Estilo solo para la tabla de clientes */
.clientes-table {
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

/* Estilo para los encabezados de la tabla de clientes */
.clientes-table th {
  background-color: #b91c1c; /* Azul para el encabezado */
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  padding: 12px;
  text-align: center;
}

/* Estilo para las celdas de la tabla de clientes */
.clientes-table td {
  background-color: #f9fafb;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
  text-align: center;
}

/* Estilo para las filas alternadas en la tabla de clientes */
.clientes-table tr:nth-child(even) td {
  background-color: #e5e7eb;
}

/* Estilo para el hover de las filas en la tabla de clientes */
.clientes-table tr:hover td {
  background-color: #fddede; /* Rojo claro para hover */
}

/* Estilo para el cuadro de cliente seleccionado */
.cliente-seleccionado {
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

/* Botón de crear cliente */
.crear-cliente-button {
  margin-left: 10%;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #e53e3e; /* Rojo para el botón de crear cliente */
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Estilos para el formulario de crear/editar cliente */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Sombra suave para dar profundidad */
  width: 80%;
  max-width: 800px;
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
