<script setup lang="ts">
  import useClima from '../composables/useClima';
  import type { Clima } from '../interfaces/Clima';

  /* Obtenemos la función que convierte temperaturas a Celsius */
  const { formatearTemperatura } = useClima()

  /* Recibimos el objeto "clima" desde el componente padre */
  defineProps<{
    clima: Clima
  }>()
</script>

<template>
  <div class="resultado">

    <!-- Nombre de la ciudad -->
    <h2>Clima de: {{ clima.name }}</h2>

    <!-- Temperatura actual convertida a °C -->
    <p class="actual">
      {{ formatearTemperatura(clima.main.temp) }} &deg;C
    </p>

    <!-- Temperaturas mínima y máxima -->
    <div class="temperaturas">
      <p>
        Min: {{ formatearTemperatura(clima.main.temp_min) }}
        <span>&deg;C</span>
      </p>

      <p>
        Máx: {{ formatearTemperatura(clima.main.temp_max) }}
        <span>&deg;C</span>
      </p>
    </div>

  </div>
</template>



