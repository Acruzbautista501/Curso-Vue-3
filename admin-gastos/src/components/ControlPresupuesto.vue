<script setup lang="ts">
  // Importamos utilidades de Vue
  import { computed } from 'vue';

  // Importamos una función auxiliar para formatear cantidades en formato moneda
  import { formatearCantidad } from '../helpers';

  // Importamos el tipo de datos del presupuesto (interfaz TypeScript)
  import type { Planificador } from '../interfaces/Presupuesto';

  // Importamos el componente gráfico de progreso circular
  import CircleProgress from 'vue3-circle-progress'
  import 'vue3-circle-progress/dist/circle-progress.css'

  // Recibimos las propiedades desde el componente padre
  const props = defineProps<{
    presupuesto: Planificador // Objeto con presupuesto, disponible y gastado
  }>()

  // Definimos los eventos que este componente puede emitir
  const emit = defineEmits<{
    (e: 'reset-app'): void // Evento para reiniciar la aplicación
  }>()

  // Computed para calcular el porcentaje de gasto
  // Fórmula: ((presupuesto - disponible) / presupuesto) * 100
  const porcentaje = computed(() => {
    const presupuesto = props.presupuesto.presupuesto
    const disponible = props.presupuesto.disponible
    return Math.round(((presupuesto - disponible) / presupuesto) * 100)
  })
</script>

<template>
  <div class="dos-columnas">
    <!-- Sección del gráfico circular -->
    <div class="contenedor-grafico">
      <!-- Porcentaje numérico mostrado sobre el gráfico -->
      <p class="porcentaje">{{ porcentaje }}%</p>

      <!-- Componente de progreso circular -->
      <circle-progress
        :percent="porcentaje" 
        :size="250"                 
        :border-width="30"          
        :border-bg-width="30"       
        fill-color="#3b82f6"       
        empty-color="#e1e1e1"       
      />
        <!-- :percent="porcentaje": Porcentaje calculado -->
        <!-- :size="250": Tamaño del círculo -->
        <!-- :border-width="30": Grosor del borde del progreso -->
        <!-- :border-bg-width="30": Grosor del borde de fondo -->
        <!-- fill-color="#3b82f6": Color del progreso -->
        <!-- empty-color="#e1e1e1": Color de fondo -->
    </div>

    <!-- Sección con los valores del presupuesto -->
    <div class="contenedor-presupuesto">
      <!-- Botón para reiniciar la app -->
      <button
        class="reset-app"
        type="button"
        @click="emit('reset-app')"
      >
        Resetear App
      </button>

      <!-- Presupuesto total -->
      <p>
        <span>Presupuesto:</span>
        {{ formatearCantidad(presupuesto.presupuesto) }}
      </p>

      <!-- Dinero disponible -->
      <p>
        <span>Disponible:</span>
        {{ formatearCantidad(presupuesto.disponible) }}
      </p>

      <!-- Dinero gastado -->
      <p>
        <span>Gastado:</span>
        {{ formatearCantidad(presupuesto.gastado) }}
      </p>
    </div>
  </div>
</template>


<style scoped>
  .contenedor-grafico {
    position: relative;
  }
  .porcentaje {
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 100;
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro);
  }
  .dos-columnas{
    display: flex;
    flex-direction: column;
  }
  .dos-columnas > :first-child {
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .dos-columnas {
      flex-direction: row;
      gap: 4rem;
      align-items: center;
    }
    .dos-columnas > :first-child {
      margin-bottom: 0rem;
    }
  }

  .reset-app {
    background-color: #DB2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
  }

  .reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
  }

  .contenedor-presupuesto {
    width: 100%;
  }

  .contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
  }

  @media (min-width: 768px) {
    .contenedor-presupuesto p {
      text-align: left;
    }
  }

  .contenedor-presupuesto span {
    font-weight: 900;
    color: var(--azul);
  }
</style>