<script setup lang="ts">
import { computed } from 'vue';
import type { Alertas } from '../interfaces/Mascota';

// Prop recibido: objeto con tipo y mensaje de la alerta
const props = defineProps<{
  alerta: Alertas
}>()

// Computed para verificar si el tipo de alerta es "error"
const isError = computed(() => {
  return props.alerta.tipo === 'error'
})
</script>

<template>
  <!-- Caja de alerta dinámica (roja si error, verde si éxito) -->
  <div
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
  >
    <!-- Mensaje mostrado en la alerta -->
    {{ alerta.mensaje }}
  </div>
</template>
