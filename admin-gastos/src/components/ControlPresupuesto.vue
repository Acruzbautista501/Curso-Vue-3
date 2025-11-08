<script setup lang="ts">
  import grafico from '../assets/img/grafico.jpg'
  import { formatearCantidad } from '../helpers';
  import type { Planificador } from '../interfaces/Presupuesto';

  defineProps<{
    presupuesto: Planificador
  }>()
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img 
        :src="grafico" 

      >
    </div>
    <div class="contenedor-presupuesto">
      <button
        class="reset-app"
      >
        Resetear App
      </button>
      <p>
        <span>Presupuesto:</span>
        {{ formatearCantidad(presupuesto.presupuesto )}}
      </p>
      <p>
        <span>Disponible:</span>
        {{ formatearCantidad(presupuesto.disponible )}}
      </p>
      <p>
        <span>Gastado:</span>
        {{ formatearCantidad(presupuesto.gastado )}}
      </p>
    </div>
  </div>
</template>

<style scoped>
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