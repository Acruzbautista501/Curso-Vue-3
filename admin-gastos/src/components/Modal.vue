<script setup lang="ts">
/* Importaciones principales de Vue */
import { ref, computed } from 'vue'

/* Imagen del botón para cerrar el modal */
import cerrarModal from '../assets/img/cerrar.svg'

/* Tipos TypeScript para mayor seguridad en props y estado */
import type { Gastos, Modals } from '../interfaces/Presupuesto'

/* Componente reutilizable para mostrar mensajes de error */
import Alerta from './Alerta.vue'

/* Estado local para manejar errores del formulario */
const error = ref<string>('')

/* 
  Definición de eventos personalizados (emits):
    - Permiten la comunicación hacia el componente padre
*/
const emit = defineEmits<{
  (e: 'ocultar-modal'):void
  (e: 'guardar-gasto'):void
  (e: 'eliminar-gasto'):void
  (e: 'update:nombre', value: string):void
  (e: 'update:cantidad', value: string | number):void
  (e: 'update:categoria', value: string):void
}>()

/* 
  Props recibidas desde el componente padre
    - modal: controla visibilidad y animación
    - gasto: contiene los datos del gasto actual
    - disponible: dinero restante del presupuesto
    - id: identifica si el gasto ya existe o es nuevo
*/
const props = defineProps<{
  modal: Modals,
  gasto: Gastos
  disponible: number
  id: string | number
}>()


const old = Number(props.gasto.cantidad)

/* 
  Función principal para validar y guardar un gasto:
    - Verifica campos vacíos, cantidad válida y límite de presupuesto
*/
const agregarGasto = () => {
  const cantidad = Number(props.gasto.cantidad)
  const categoria = props.gasto.categoria
  const nombre = props.gasto.nombre
  const disponible = props.disponible
  const id = props.id

  /* Validar campos vacíos */
  if ([nombre, cantidad, categoria].includes('')) {
    error.value = 'Todos los campos son obligatorios'
    setTimeout(() => (error.value = ''), 3000)
    return
  }

  /* Validar cantidad válida */
  if (cantidad <= 0) {
    error.value = 'Cantidad no válida'
    setTimeout(() => (error.value = ''), 3000)
    return
  }

  /* Validar que no se exceda el presupuesto disponible */
  if (id) {
    // Si se edita un gasto existente
    if (old) {
      if (cantidad > old + disponible) {
        error.value = 'Haz excedido el presupuesto'
        setTimeout(() => (error.value = ''), 3000)
        return
      }
    }
  } else {
    // Si se crea un nuevo gasto
    if (cantidad > disponible) {
      error.value = 'Haz excedido el presupuesto'
      setTimeout(() => (error.value = ''), 3000)
      return
    }
  }

  /* Si pasa todas las validaciones, emite el evento para guardar */
  emit('guardar-gasto')
}

/* 
  Determina si el usuario está editando o agregando un gasto:
    - Si hay un id, está editando
*/
const editantdoGasto = computed(() => {
  return props.id
})
</script>

<template>
  <div class="modal">
    <!-- Botón de cierre del modal -->
    <div class="cerrar-modal">
      <img 
        :src="cerrarModal" 
        alt="Cerrar modal"
        @click="emit('ocultar-modal')"
      >
    </div>

    <!-- Contenedor del formulario con animación -->
    <div 
      class="contenedor contenedor-formulario"
      :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <!-- Formulario de creación/edición de gasto -->
      <form
        class="nuevo-gasto"
        @submit.prevent="agregarGasto"
      >
        <legend>{{ editantdoGasto ? 'Editando Gasto' : 'Añadiendo Gasto' }}</legend>

        <!-- Alerta para mostrar errores de validación -->
        <Alerta v-if="error">
          {{ error }}
        </Alerta>

        <!-- Campo: Nombre del gasto -->
        <div class="campo">
          <label for="nombre">Nombre Gasto:</label>
          <input 
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            v-model="gasto.nombre"
          >
        </div>

        <!-- Campo: Cantidad -->
        <div class="campo">
          <label for="cantidad">Cantidad:</label>
          <input 
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto, ej. 300"
            v-model="gasto.cantidad"
          >
        </div>

        <!-- Campo: Categoría -->
        <div class="campo">
          <label for="categoria">Categoría:</label>
          <select 
            id="categoria"
            v-model="gasto.categoria"
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <!-- Botón de guardar -->
        <input 
          type="submit" 
          :value="[editantdoGasto ? 'Guardar Cambios' : 'Añadir Gasto']"
        >
      </form>

      <!-- Botón de eliminar (solo visible si se edita un gasto existente) -->
      <button
        type="button"
        class="btn-eliminar"
        v-if="editantdoGasto"
        @click="emit('eliminar-gasto')"
      >
        Eliminar Gasto
      </button>
    </div>
  </div>
</template>


<style scoped>
  .modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9 );
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
  }
  .cerrar-modal img {
    width: 3rem;
    cursor: pointer;
  }
  .contenedor-formulario {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
  }
  .contenedor-formulario.animar {
    opacity: 1;
  }
  .contenedor-formulario.cerrar {
    opacity: 0;
  }
  .nuevo-gasto {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
  }
  .nuevo-gasto legend {
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
  }
  .campo {
    display: grid;
    gap: 2rem;
  }
  .nuevo-gasto input,
  .nuevo-gasto select {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
  }
  .nuevo-gasto label {
    color: var(--blanco);
    font-size: 3rem;
  }
  .nuevo-gasto input[type="submit"] {
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
  }
  .btn-eliminar {
    border:none;
    padding: 1rem;
    width: 100%;
    background-color: #ef4444;
    font-weight:  700;
    font-size: 1.2rem;
    color: var(--blanco);
    margin-top: 10rem;
    cursor: pointer;
  }
</style>