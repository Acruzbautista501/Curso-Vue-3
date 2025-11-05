<script setup lang="ts">
import { computed } from 'vue';
import type { Alertas } from '../interfaces/Mascota';

  const props = defineProps<{
    alerta: Alertas
  }>()
  
  const isError = computed(() => {
    return props.alerta.tipo === 'error'
  })
</script>

<template>
  <div
    :class="[isError ? 'bg-red-500' : 'bg-green-500']"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
    {{ alerta.mensaje }}
  </div>
</template>
