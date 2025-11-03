<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { db } from './data/guitarra';
  import type { carrito, guitar } from './interfaces/Guitar';
  import Guitarra from './components/Guitarra.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  


  // Objeto reactivo para obtener las guitarras
  // const state = reactive ({
  //   guitarras: db
  // })
  // console.log(state.guitarras)

  // Variable reactiva tipada para obtener las guitarras
  const guitarras = ref<guitar[]>([])

  const carrito = ref<carrito[]>([]) // → acepta objetos con la interface guitar.

  // Función que escucha los eventos del componente
  const agregarCarrito = (guitarra: guitar) => {
    // va a retornar si el id del producto es igual al id de la guitarra
    const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)

    // Variable que inyecta la posición del producto en el arreglo 
    const productoExiste = carrito.value[existeCarrito]
    //Condicional que verifica que si el pŕoducto
    if(productoExiste) {
      // va a inyectar la posición del producto en el arreglo
      productoExiste.cantidad++
    } else {
      // Crea un producto con cantidad inicial 1
      const producto: carrito = {
        ...guitarra,
        cantidad: 1
      }
      // Agrega el producto al carrito
      carrito.value.push(producto)
      // Muestra el carrito en consola
      console.log(carrito.value)
    }
    
  }

  onMounted(() => { 
    guitarras.value = db;
  })
  

</script>

<template>
  <Header
    :carrito="carrito"
  />
  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitarra 
        v-for="guitarra in guitarras" 
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      /> 
      <!-- :guitarra="guitarra", Envía los datos al componente hijo-->
      <!-- @incrementar="agregarCarrito", recibe los datos del componente hijo-->
    </div>
  </main>
  <Footer />
</template>

<style>

</style>
