<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
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

  const guitarra = ref<guitar>({
    id: 0,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0
  })

// Observa cambios en el carrito y actualiza automáticamente el localStorage
watch(carrito, () => {
  guardarLocalStorage() // Guarda los cambios en el almacenamiento local
}, {
  deep: true // Permite detectar cambios dentro de los objetos del carrito
})



  // Cuando el componente se monta
  onMounted(() => { 
    // Asigna la base de datos de guitarras al estado
    guitarras.value = db

    // Carga una guitarra por defecto (índice 3 o vacía si no existe)
    guitarra.value = db[3] ?? {
      id: 0,
      nombre: '',
      imagen: '',
      descripcion: '',
      precio: 0
    }

    // Recupera el carrito guardado en localStorage (si existe)
    const carritoStorage = localStorage.getItem('carrito')
    if (carritoStorage) {
      carrito.value = JSON.parse(carritoStorage)
    }
  })

  //  Guarda el carrito actual en el almacenamiento local del navegador
  const guardarLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
  }


  // Función que escucha los eventos del componente
  const agregarCarrito = (guitarra: guitar) => {
    // va a retornar si el id del producto es igual al id de la guitarra
    const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)

    // Variable que inyecta la posición del producto en el arreglo 
    const productoExiste = carrito.value[existeCarrito]
    //Condicional que verifica que si el pŕoducto existe
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

  const decrementarCantidad = (id: number) => {
    //find() te devuelve directamente el objeto (o undefined), así evitas un acceso doble.
    const productoDecrementar = carrito.value.find(producto => producto.id === id)

    // si no existe o si es igual o menor a uno, salimos
    if(!productoDecrementar || productoDecrementar.cantidad <= 1) return
    productoDecrementar.cantidad--

  }

  const incrementarCantidad = (id:number) => {
    //find() te devuelve directamente el objeto (o undefined), así evitas un acceso doble.
    const productoIncrementar = carrito.value.find(producto => producto.id === id)

    // si no existe o si es igual o mayor a cinco, salimos
    if (!productoIncrementar || productoIncrementar.cantidad >= 5) return 

    productoIncrementar.cantidad++

  }

  // Función para eliminar un producto del carrito por su ID
  const eliminarProducto = (id: number) => {
    // Filtra el carrito y conserva solo los productos cuyo ID sea distinto al recibido
    carrito.value = carrito.value.filter(producto => producto.id !== id)

  }

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    carrito.value = []
  }


</script>

<template>
<!-- 
  Props (izquierda): datos que el padre envía al hijo
    :carrito="carrito" 
    :guitarra="guitarra"

  🔹 Emits (derecha): eventos que el hijo envía al padre
    @decrementar-cantidad="decrementarCantidad"
    @incrementar-cantidad="incrementarCantidad"
    @agregar-carrito="agregarCarrito"
    @eliminar-producto="eliminarProducto"
    @vaciar-carrito="vaciarCarrito"
-->
<Header
  :carrito="carrito" 
  :guitarra="guitarra"
  @decrementar-cantidad="decrementarCantidad"
  @incrementar-cantidad="incrementarCantidad"
  @agregar-carrito="agregarCarrito"
  @eliminar-producto="eliminarProducto"
  @vaciar-carrito="vaciarCarrito"
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
