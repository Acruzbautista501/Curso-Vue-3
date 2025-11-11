<script setup lang="ts">
// Importamos funciones y utilidades de Vue
import { ref, onMounted, watch } from 'vue';

// Importamos la base de datos local simulada
import { db } from './data/guitarra';

// Importamos los tipos TypeScript para tipar datos correctamente
import type { carrito, guitar } from './interfaces/Guitar';

// Importamos los componentes hijos
import Guitarra from './components/Guitarra.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// -------------------- ESTADO --------------------

// Lista completa de guitarras disponibles (simula la base de datos)
const guitarras = ref<guitar[]>([])

// Carrito de compras, inicialmente vacío
const carrito = ref<carrito[]>([])

// Guitarra destacada que se muestra en el encabezado
const guitarra = ref<guitar>({
  id: 0,
  nombre: '',
  imagen: '',
  descripcion: '',
  precio: 0
})

// -------------------- WATCHERS --------------------

// Observa el carrito y guarda los cambios automáticamente en localStorage
watch(carrito, () => {
  guardarLocalStorage() 
}, { deep: true })

// -------------------- CICLO DE VIDA --------------------

// Se ejecuta al montar el componente
onMounted(() => { 
  // Carga las guitarras desde la base de datos simulada
  guitarras.value = db

  // Selecciona una guitarra destacada (posición 3 del arreglo)
  guitarra.value = db[3] ?? {
    id: 0,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0
  }

  // Recupera el carrito almacenado en localStorage si existe
  const carritoStorage = localStorage.getItem('carrito')
  if (carritoStorage) {
    carrito.value = JSON.parse(carritoStorage)
  }
})

// -------------------- FUNCIONES --------------------

// Guarda el carrito actual en localStorage
const guardarLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

// Agrega una guitarra al carrito o incrementa su cantidad si ya existe
const agregarCarrito = (guitarra: guitar) => {
  const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)
  const productoExiste = carrito.value[existeCarrito]

  if (productoExiste) {
    // Si ya está en el carrito, incrementa su cantidad
    productoExiste.cantidad++
  } else {
    // Si no existe, lo agrega como nuevo producto
    const producto: carrito = {
      ...guitarra,
      cantidad: 1
    }
    carrito.value.push(producto)
  }
}

// Disminuye la cantidad de un producto en el carrito
const decrementarCantidad = (id: number) => {
  const productoDecrementar = carrito.value.find(producto => producto.id === id)
  if (!productoDecrementar || productoDecrementar.cantidad <= 1) return
  productoDecrementar.cantidad--
}

// Aumenta la cantidad de un producto hasta un máximo de 5
const incrementarCantidad = (id: number) => {
  const productoIncrementar = carrito.value.find(producto => producto.id === id)
  if (!productoIncrementar || productoIncrementar.cantidad >= 5) return 
  productoIncrementar.cantidad++
}

// Elimina un producto completamente del carrito
const eliminarProducto = (id: number) => {
  carrito.value = carrito.value.filter(producto => producto.id !== id)
}

// Vacía el carrito completamente
const vaciarCarrito = () => {
  carrito.value = []
}
</script>

<template>
  <!-- Componente Header: muestra la guitarra destacada y el carrito -->
  <Header
    :carrito="carrito" 
    :guitarra="guitarra"
    @decrementar-cantidad="decrementarCantidad"
    @incrementar-cantidad="incrementarCantidad"
    @agregar-carrito="agregarCarrito"
    @eliminar-producto="eliminarProducto"
    @vaciar-carrito="vaciarCarrito"
  />

  <!-- Sección principal con la colección de guitarras -->
  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <!-- Renderiza cada guitarra usando el componente Guitarra -->
      <Guitarra 
        v-for="guitarra in guitarras" 
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      /> 
    </div>
  </main>

  <!-- Pie de página -->
  <Footer />
</template>

