<script setup lang="ts">
import RecetaComponent from '@/components/RecetaComponent.vue';
import { useBebidasStore } from '@/stores/Bebidas';

const bebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>

  <p v-if="bebidas.noRecetas" class="my-10 text-center text-2xl">No hay recetas, utiliza el formulario para buscar recetas</p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <RecetaComponent 
      v-for="receta in bebidas.recetas"
      :receta="receta"
      :key="receta.idDrink"
    />
  </div>
</template>

