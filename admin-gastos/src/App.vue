<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue'
import Modal from './components/Modal.vue'
import Gasto from './components/Gasto.vue'
import { generarId } from './helpers'
import type { Planificador, Modals, Gastos } from './interfaces/Presupuesto'
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'

const modal = reactive<Modals>({
  mostrar: false,
  animar: false
})

const presupuesto = ref<Planificador>({
  presupuesto: 0,
  disponible: 0,
  gastado: 0
})

const gasto = reactive<Gastos>({
  id: '',
  nombre: '',
  cantidad: '',
  categoria: '',
  fecha: Date.now()
})

const gastos = ref<Gastos[]>([])

watch(gastos, () => {
  const totalGastado = gastos.value.reduce((total, gasto) => Number(gasto.cantidad )+ total, 0)
  presupuesto.value.gastado = totalGastado

  const presupuestoDisponible = presupuesto.value.presupuesto - totalGastado
  presupuesto.value.disponible = presupuestoDisponible
}, {
  deep: true
})

watch(modal, () => {
  if(!modal.mostrar) {
    reiniciarStateGasto()
  }
}, {
  deep: true
})

const definirPresupuesto = (cantidad: number) => {
  presupuesto.value.presupuesto = cantidad
  presupuesto.value.disponible = cantidad
}

const mostrarModal = () => {
  modal.mostrar = true
  setTimeout(() => {
    modal.animar = true
  }, 300);
}

const ocultarModal = () => {
  modal.animar = false
  setTimeout(() => {
    modal.mostrar = false
  }, 300);
}

const guardarGasto = () => {
  if (gasto.id) {
    const { id } = gasto
    const index = gastos.value.findIndex(g => g.id === id)
    gastos.value[index] = {...gasto}
  } else {
    gastos.value.push({
      ...gasto,
      id: generarId()
    })
  }
  ocultarModal()
  reiniciarStateGasto()
}

const reiniciarStateGasto = () => {
    Object.assign(gasto, {
    nombre: '',
    cantidad: '',
    categoria: '',
    fecha: Date.now()
  })
}

const seleccionarGasto = (id:number|string) => {
  const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0]
  Object.assign(gasto, gastoEditar)
  mostrarModal()
}
</script>

<template>
  <div :class="{fijar: modal.mostrar}">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto 
          v-if="presupuesto.presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto 
          v-else
          :presupuesto="presupuesto"
        />
      </div>
    </header>
    <main v-if="presupuesto.presupuesto > 0">

      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Gasto
         v-for="gasto in gastos"
         :key="gasto.id"
         :gasto="gasto"
         @seleccionar-gasto="seleccionarGasto"
        />
      </div>

      <div class="crear-gasto">
        <img 
          :src="iconoNuevoGasto" 
          alt="icono nuevo gasto"
          @click="mostrarModal"
        >
      </div>
      <Modal
        v-if="modal.mostrar" 
        @ocultar-modal="ocultarModal"
        :modal="modal"
        :gasto="gasto"
        :disponible="presupuesto.disponible"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        @guardar-gasto="guardarGasto"
      />
    </main>
  </div>
</template>


<style>
  :root {
    --azul: #3b82f6;
    --blanco: #FFF;
    --gris-claro: #F5F5F5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000,
  }
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-seri;
    background-color: var(--gris-claro);
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  .fijar {
    overflow: hidden;
    height: 100vh;
  }
  header {
    background-color: var(--azul);
  }
  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra {
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }
  .crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .crear-gasto img {
    width: 5rem;
    cursor: pointer;
  }
  .listado-gastos {
    margin-top: 10rem;
  }
  .listado-gastos h2 {
    font-weight: 900;
    color: var(--gris-oscuro);
  }

</style>
