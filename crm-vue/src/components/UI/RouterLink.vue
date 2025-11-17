<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Props: nombre de la ruta a la que se dirigirá el enlace
defineProps<{
  to: string
}>()
</script>

<template>
  <!-- Componente RouterLink de Vue Router -->
  <RouterLink 
    :to="{ name: to }" 
    class="block md:inline-block rounded bg-blue-600 py-2 px-3 text-white uppercase font-bold text-sm shadow hover:bg-blue-500"
  >
    <!-- Slot permite colocar contenido dentro del enlace (texto o elementos hijos) -->
    <slot></slot>
  </RouterLink>
</template>
