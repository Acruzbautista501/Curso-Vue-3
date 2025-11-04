<script setup lang="ts">
import type { Alertas } from '../interfaces/Mascota';

  defineProps<{
    alerta: Alertas
  }>()
  
</script>

<template>
  <div class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md bg-red-500">
    {{ alerta.mensaje }}
  </div>
</template>
