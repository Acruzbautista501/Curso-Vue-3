<script setup lang="ts">
  // Importamos RouterView, que es el componente especial donde se renderizan
  // las vistas asociadas a cada ruta definida en Vue Router.
  import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Encabezado principal de la app -->
  <header class="bg-slate-800">
    <div class="mx-auto max-w-6xl py-10">
      <!-- Título mostrado en la parte superior -->
      <h1 class="text-4xl font-extrabold text-white">
        Administrador de Clientes
      </h1>
    </div>
  </header>

  <!-- Contenedor principal donde cambia el contenido según la ruta -->
  <main class="max-w-6xl mx-auto mt-10">
    <!-- Aquí Vue Router renderiza dinámicamente la vista actual -->
    <RouterView />
  </main>
</template>
