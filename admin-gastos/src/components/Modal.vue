<script setup lang="ts">
import { ref, computed } from 'vue';
import cerrarModal from '../assets/img/cerrar.svg'
import type { Gastos, Modals } from '../interfaces/Presupuesto';
import Alerta from './Alerta.vue';

const error = ref<string>('')

const emit = defineEmits<{
  (e: 'ocultar-modal'):void
  (e: 'guardar-gasto'):void
  (e: 'eliminar-gasto'):void
  (e: 'update:nombre', value: string):void
  (e: 'update:cantidad', value: string | number):void
  (e: 'update:categoria', value: string):void
}>()

const props = defineProps<{
  modal: Modals,
  gasto: Gastos
  disponible: number
  id: string | number
}>()


const old = Number(props.gasto.cantidad)

const agregarGasto = () => {
  const cantidad = Number(props.gasto.cantidad)
  const categoria = props.gasto.categoria
  const nombre =  props.gasto.nombre
  const disponible = props.disponible
  const id = props.id

  // Validar que no haya campos vacíos
  if([nombre, cantidad, categoria].includes('')) {
    error.value = 'Todos los campos son obligatorios'
    setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  }

  // Validar la cantidad
  if(cantidad <= 0) {
    error.value = 'Cantidad no válida'
    setTimeout(() => {
      error.value = ''
    }, 3000);
    return
  }

  if(id) {
    if(old) {
      // Validar que el usuario no gaste más de lo necesario
      if(cantidad > old + disponible) {
        error.value = 'Haz excedido el presupuesto'
        setTimeout(() => {
          error.value = ''
        }, 3000);
        return
      }
    }
  } else {
    // Validar que el usuario no gaste más de lo necesario
    if(cantidad > disponible) {
      error.value = 'Haz excedido el presupuesto'
      setTimeout(() => {
        error.value = ''
      }, 3000);
      return
    }
  }

  emit('guardar-gasto')
}

const editantdoGasto = computed(() => {
  return props.id
})
</script>

<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img 
        :src="cerrarModal" 
        alt=""
        @click="emit('ocultar-modal')"
      >
    </div>
    <div 
      class="contenedor contenedor-formulario"
      :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <form
        class="nuevo-gasto"
        @submit.prevent="agregarGasto"
      >
        <legend>{{ editantdoGasto ? 'Editando Gasto': 'Añadiendo Gasto' }}</legend>
        <Alerta v-if="error">
          {{ error }}
        </Alerta>
        <div class="campo">
          <label for="nombre">Nombre Gasto:</label>
          <input 
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            v-model="gasto.nombre"
          >
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad:</label>
          <input 
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto, ej. 300"
            v-model="gasto.cantidad"
          >
        </div>
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

        <input type="submit" :value="[editantdoGasto ? 'Guardar Cambios': 'Añadir Gasto']">
      </form>
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