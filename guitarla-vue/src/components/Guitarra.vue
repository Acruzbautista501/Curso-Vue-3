<script setup lang="ts">
  // Importa la interfaz "guitar" para tipar correctamente las propiedades del componente
  import type { guitar } from '../interfaces/Guitar'; 

  // Define las props que el componente recibe desde el padre
  // En este caso, una guitarra con sus datos (nombre, imagen, descripción, precio, etc.)
  defineProps<{
    guitarra : guitar
  }>()

  // Define los eventos personalizados que el componente puede emitir
  // "agregar-carrito" envía un objeto tipo "guitar" al componente padre
  const emit = defineEmits<{
    (e: 'agregar-carrito', guitarra: guitar):void
  }>()

  // Ejemplo opcional de función interna para emitir el evento manualmente
  // const incrementar = () => {
  //   emit('agregar-carrito', guitarra)
  // }
</script>

<template>
  <!-- Contenedor principal para mostrar la información de cada guitarra -->
  <div class="col-md-6 col-lg-4 my-4 row align-items-center">
    
    <!-- Sección de la imagen de la guitarra -->
    <div class="col-4">
      <img 
        class="img-fluid" 
        :src="'/img/' + guitarra.imagen + '.jpg'" 
        :alt="'imagen guitarra ' + guitarra.nombre" 
      />
    </div>

    <!-- Sección de la información textual de la guitarra -->
    <div class="col-8">
      <!-- Nombre de la guitarra -->
      <h3 class="text-black fs-4 fw-bold text-uppercase">
        {{ guitarra.nombre }}
      </h3>

      <!-- Descripción de la guitarra -->
      <p>{{ guitarra.descripcion }}</p>

      <!-- Precio de la guitarra -->
      <p class="fw-black text-primary fs-3">
        ${{ guitarra.precio }}
      </p>

      <!-- Botón que emite el evento para agregar la guitarra al carrito -->
      <button 
        type="button" 
        class="btn btn-dark w-100"
        @click="$emit('agregar-carrito', guitarra)"
      >  
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>
