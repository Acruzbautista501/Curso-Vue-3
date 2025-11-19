<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute()

const paginaInicio = computed(() => route.name === 'inicio')
</script>

<template>
  <header
    class="bg-slate-800"
    :class="{header : paginaInicio}"
  >
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{name: 'inicio'}">
            <img class="w-32" src="/img/logo.svg" alt="Logotipo">
          </RouterLink>
        </div>
        <nav class="flex gap-4">
          <RouterLink :to="{ name: 'inicio' }" v-slot="{ isActive }">
            <span :class="isActive ? 'text-orange-500' : 'text-white'" class="uppercase font-bold">
              Inicio
            </span>
          </RouterLink>
          <RouterLink :to="{ name: 'favoritos' }" v-slot="{ isActive }">
            <span :class="isActive ? 'text-orange-500' : 'text-white'" class="uppercase font-bold">
              Favoritos
            </span>
          </RouterLink>        
        </nav>
      </div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" 
        v-if="paginaInicio"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
          >
            Nombre o ingredientes
          </label>
          <input 
            type="text"
            id="ingrediente"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            placeholder="Nombre o Ingrediente: ej. Vodka, tequila, etc"
          >
        </div>
        <div class="sapce-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
          >
            Categoría
          </label>
          <select 
            id="ingrediente"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
          >
            <option value="">-- Seleccione --</option>
          </select>
        </div> 
        <input 
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar Recetas"
        >       
      </form>
    </div>
  </header>
</template>

<style>
  .header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
  }
</style>