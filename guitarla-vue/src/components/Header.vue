<script setup lang="ts">
// Importa la función "computed" desde Vue para crear propiedades reactivas calculadas
import { computed } from 'vue'

// Importa los tipos TypeScript "carrito" y "guitar" desde la carpeta de interfaces
// Esto permite usar tipado fuerte en las props y funciones del componente
import type { carrito, guitar } from '../interfaces/Guitar'

  // Props que recibe el componente: 
  // - carrito: lista de productos añadidos
  // - guitarra: guitarra seleccionada actualmente
  const props = defineProps<{
    carrito: carrito[]
    guitarra: guitar 
  }>()

  // Eventos emitidos hacia el componente padre
  const emit = defineEmits<{
    (e: 'decrementar-cantidad', id: number): void      // Disminuye la cantidad de un producto
    (e: 'incrementar-cantidad', id: number): void      // Aumenta la cantidad de un producto
    (e: 'agregar-carrito', guitarra: guitar): void     // Agrega una guitarra al carrito
    (e: 'eliminar-producto', id: number): void         // Elimina un producto del carrito
    (e: 'vaciar-carrito'): void                        // Vacía completamente el carrito
  }>()

  // Calcula el total a pagar sumando el precio * cantidad de cada producto
  const totalPagar = computed<number>(() => {
    return props.carrito.reduce<number>(
      (total, producto) => total + (producto.cantidad * producto.precio),
      0 // Valor inicial del acumulador
    )
  })
</script>

<template>
  <header class="py-5 header">
    <div class="container-xl">
      <!-- Encabezado con logo y navegación -->
      <div class="row justify-content-center justify-content-md-between">
        <!-- Logo del sitio -->
        <div class="col-8 col-md-3">
          <a href="index.html">
            <img class="img-fluid" src="/img/logo.svg" alt="imagen logo" />
          </a>
        </div>

        <!-- Sección del carrito -->
        <nav class="col-md-6 mt-5 d-flex align-items-start justify-content-end">
          <div class="carrito">
            <img class="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

            <!-- Contenedor desplegable del carrito -->
            <div id="carrito" class="bg-white p-3">
              <!-- Si el carrito está vacío -->
              <p v-if="carrito.length === 0" class="text-center m-0">
                El carrito está vacío
              </p>

              <!-- Si hay productos en el carrito -->
              <div v-else>
                <table class="w-100 table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <!-- Recorre los productos del carrito -->
                    <tr 
                      v-for="producto in carrito"
                      :key="producto.id"
                    >
                      <td>
                        <img 
                          class="img-fluid" 
                          :src="`/img/${producto.imagen}.jpg`" 
                          alt="imagen guitarra" 
                        />
                      </td>
                      <td>{{ producto.nombre }}</td>
                      <td class="fw-bold">${{ producto.precio }}</td>
                      <td class="flex align-items-start gap-4">
                        <!-- Botones para modificar la cantidad -->
                        <button 
                          type="button" 
                          class="btn btn-dark" 
                          @click="emit('decrementar-cantidad', producto.id)"
                        >-</button>

                        {{ producto.cantidad }}

                        <button 
                          type="button" 
                          class="btn btn-dark" 
                          @click="emit('incrementar-cantidad', producto.id)"
                        >+</button>
                      </td>
                      <td>
                        <!-- Botón para eliminar producto -->
                        <button 
                          class="btn btn-danger" 
                          type="button" 
                          @click="emit('eliminar-producto', producto.id)"
                        >X</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Muestra el total a pagar -->
                <p class="text-end">
                  Total pagar: <span class="fw-bold">${{ totalPagar }}</span>
                </p>

                <!-- Botón para vaciar todo el carrito -->
                <button 
                  class="btn btn-dark w-100 mt-3 p-2" 
                  @click="emit('vaciar-carrito')"
                >
                  Vaciar Carrito
                </button>
              </div>  
            </div>
          </div>
        </nav>
      </div>

      <!-- Sección principal del header -->
      <div class="row mt-5">
        <div class="col-md-6 text-center text-md-start pt-5">
          <h1 class="display-2 fw-bold">Modelo {{ guitarra.nombre }}</h1>
          <p class="mt-5 fs-5 text-white">
            {{ guitarra.descripcion }}
          </p>
          <p class="text-primary fs-1 fw-black">${{ guitarra.precio }}</p>
        
          <!-- Botón para agregar la guitarra seleccionada al carrito -->
          <button 
            type="button" 
            class="btn fs-4 bg-primary text-white py-2 px-5" 
            @click="emit('agregar-carrito', guitarra)"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <!-- Imagen decorativa del encabezado -->
    <img class="header-guitarra" src="/img/header_guitarra.png" alt="imagen header" />
  </header>
</template>

