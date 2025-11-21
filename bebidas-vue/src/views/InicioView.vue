<script setup lang="ts">
import RecetaComponent from '@/components/RecetaComponent.vue';
import { useBebidasStore } from '@/stores/Bebidas';

const bebidas = useBebidasStore()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
    <RecetaComponent 
      v-for="receta in bebidas.recetas"
      :receta="receta"
      :key="receta.idDrink"
    />
  </div>
</template>

