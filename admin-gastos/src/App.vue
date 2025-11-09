<script setup lang="ts">
/* Importaciones de Vue */
import { ref, reactive, watch, computed, onMounted } from 'vue'

/* Importación de componentes */
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue'
import Modal from './components/Modal.vue'
import Filtros from './components/Filtros.vue'
import Gasto from './components/Gasto.vue'

/* Función auxiliar para generar IDs únicos */
import { generarId } from './helpers'

/* Tipos TypeScript para mayor seguridad en props y estado */
import type { Planificador, Modals, Gastos } from './interfaces/Presupuesto'

/* Imagen para el botón de nuevo gasto */
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'

/* Librería para las alertas de la aplicación */
import Swal from 'sweetalert2'


/* Estado reactivo del modal */
const modal = reactive<Modals>({
  mostrar: false,
  animar: false
})

/* Estado del presupuesto */
const presupuesto = ref<Planificador>({
  presupuesto: 0,
  disponible: 0,
  gastado: 0,
  filtro: ''
})

/* Estado del gasto actual (usado en el modal) */
const gasto = reactive<Gastos>({
  id: '',
  nombre: '',
  cantidad: '',
  categoria: '',
  fecha: Date.now()
})

/* Lista de todos los gastos */
const gastos = ref<Gastos[]>([])

/* Observa cambios en la lista de gastos:
    - Recalcula el total gastado y disponible
    - Guarda los datos en localStorage
*/
watch(gastos, () => {
  const totalGastado = gastos.value.reduce((total, gasto) => Number(gasto.cantidad )+ total, 0)
  presupuesto.value.gastado = totalGastado

  const presupuestoDisponible = presupuesto.value.presupuesto - totalGastado
  presupuesto.value.disponible = presupuestoDisponible
  
  localStorage.setItem('gasto', JSON.stringify(gastos.value))
}, {
  deep: true
})


/* Observa el estado del modal:
    - Si el modal se cierra, reinicia el formulario del gasto
*/
watch(modal, () => {
  if(!modal.mostrar) {
    reiniciarStateGasto()
  }
}, {
  deep: true
})

/* Guarda el presupuesto cuando cambia */
watch(
  () => presupuesto.value.presupuesto,
  (nuevoPresupuesto) => {
    localStorage.setItem('presupuesto', String(nuevoPresupuesto))
  }
)

/* 
  Se ejecuta al cargar el componente:
    - Carga presupuesto y gastos desde localStorage
*/
onMounted(() => {
  const presupuestoStorage = localStorage.getItem('presupuesto')
  if(presupuestoStorage) {
    presupuesto.value.presupuesto = Number(presupuestoStorage)
    presupuesto.value.disponible = Number(presupuestoStorage)
  }

  const gastosStorage = localStorage.getItem('gasto')
  if(gastosStorage) {
    gastos.value = JSON.parse(gastosStorage)
  }
})

/* Define el presupuesto inicial */
const definirPresupuesto = (cantidad: number) => {
  presupuesto.value.presupuesto = cantidad
  presupuesto.value.disponible = cantidad
}

/* Muestra el modal con animación */
const mostrarModal = () => {
  modal.mostrar = true
  setTimeout(() => {
    modal.animar = true
  }, 300);
}

/* Oculta el modal con animación */
const ocultarModal = () => {
  modal.animar = false
  setTimeout(() => {
    modal.mostrar = false
  }, 300);
}

/* Guarda un gasto (nuevo o editado) */
const guardarGasto = () => {
  if (gasto.id) {
    // Editar gasto existente
    const { id } = gasto
    const index = gastos.value.findIndex(g => g.id === id)
    gastos.value[index] = {...gasto}
  } else {
    // Crear gasto nuevo
    gastos.value.push({
      ...gasto,
      id: generarId()
    })
  }
  ocultarModal()
  reiniciarStateGasto()
}

/* Reinicia los campos del gasto */
const reiniciarStateGasto = () => {
    Object.assign(gasto, {
    nombre: '',
    cantidad: '',
    categoria: '',
    fecha: Date.now()
  })
}

/* Selecciona un gasto para editarlo */
const seleccionarGasto = (id:number|string) => {
  const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0]
  Object.assign(gasto, gastoEditar)
  mostrarModal()
}

/* 
  Elimina un gasto actual:
    - No se selecciona el id, ya que el modal contiene el id del gasto
*/
const eliminarGasto = async () => {
  // Pregunta si se quiere eliminar el gasto actual
  const confirm = await Swal.fire ( {
    title: '¿Eliminar gasto?',
    text: '¿Estás seguro de eliminar este gasto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'Cancelar'
  })

  // Si le da en confirmar, se elimina el gasto actual
  if(confirm.isConfirmed){
    gastos.value = gastos.value.filter(g => g.id !== gasto.id)
    ocultarModal()

    // Alerta que indica que el gasto actual fue eliminado
    await Swal.fire({
      title: 'Gasto eliminado',
      text: 'El gasto ha sido eliminado correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
  }
}

/*  Filtra los gastos según la categoría seleccionada */
const gastosFiltrados = computed(() => {
  const filtro = presupuesto.value.filtro
  if(filtro) {
    return gastos.value.filter(gasto => gasto.categoria === filtro)
  }
  return gastos.value
})

/* Reinicia toda la app */
const resetApp = async () => {
  // Pregunta si se quiere resetear la app
  const confirm = await Swal.fire ({
    title: '¿Resetear App?',
    text: '¿Estás seguro de resetear la app?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, resetear',
    cancelButtonText: 'Cancelar'
  })

  // Si le da en confirmar, se resetea la aplicación
  if(confirm.isConfirmed) {
    gastos.value = []
    presupuesto.value.presupuesto = 0

    // Alerta que indica que la app fue reseteada
    await Swal.fire({
      title: 'App reseteada',
      text: 'Tu aplicación ha sido reiniciada correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })

  }
}
</script>

<template>
  <div :class="{fijar: modal.mostrar}">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
       <!-- Si no hay presupuesto, muestra el componente para definirlo -->
        <Presupuesto 
          v-if="presupuesto.presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <!-- Si ya hay presupuesto, muestra el control de presupuesto -->
        <ControlPresupuesto 
          v-else
          :presupuesto="presupuesto"
          @reset-app="resetApp"
        />
      </div>
    </header>

    <!-- Solo muestra el contenido si hay presupuesto definido -->
    <main v-if="presupuesto.presupuesto > 0">

      <!-- Filtro de gastos por categoría -->
      <Filtros v-model:filtro="presupuesto.filtro" />

      <!-- Listado de gastos -->
      <div class="listado-gastos contenedor">
        <h2>{{ gastosFiltrados.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>

        <!-- Renderiza cada gasto -->
        <Gasto
          v-for="gasto in gastosFiltrados"
          :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>

      <!-- Botón flotante para crear nuevo gasto -->
      <div class="crear-gasto">
        <img 
          :src="iconoNuevoGasto" 
          alt="icono nuevo gasto"
          @click="mostrarModal"
        >
      </div>

      <!-- Modal para crear o editar gasto -->
      <Modal
        v-if="modal.mostrar" 
        @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
        :modal="modal"
        :gasto="gasto"
        :disponible="presupuesto.disponible"
        :id="gasto.id"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
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
