<script setup lang="ts">
  import useClima from '../composables/useClima';
  import type { Clima } from '../interfaces/Clima';

  const {formatearTemperatura} = useClima()
  defineProps<{
    clima: Clima
  }>()
</script>

<template>
  <div class="resultado">
    <h2>Clima de: {{ clima.name }}</h2>
    <p class="actual">{{ formatearTemperatura(clima.main.temp)}} &deg;C</p>
    <div class="temperaturas">
      <p>Min: {{ formatearTemperatura(clima.main.temp_min)}}<span>&deg;C</span></p>
      <p>Máx: {{ formatearTemperatura(clima.main.temp_max)}}<span>&deg;C</span></p>
    </div>
  </div>
</template>


