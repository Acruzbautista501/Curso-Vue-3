<script setup lang="ts">
/* Importamos los componentes necesarios para la interfaz */
import Alerta from './components/Alerta.vue';
import Clima from './components/Clima.vue';
import Formulario from './components/Formulario.vue';
import Spinner from './components/Spinner.vue';

/* Importamos el composable que contiene toda la lógica del clima */
import useClima from './composables/useClima';

/* Extraemos las propiedades y funciones del composable */
const { obtenerClima, clima, cargandoClima, mostrarClima, error } = useClima()
</script>

<template>
  <h1 class="titulo">Buscador de clima</h1>

  <div class="contenedor buscador-clima">
    <!-- Componente del formulario. 
         Emite el evento "obtener-clima" cuando el usuario envía la búsqueda -->
    <Formulario @obtener-clima="obtenerClima" />

    <!-- Si la app está cargando datos, mostramos el spinner -->
    <Spinner v-if="cargandoClima" />

    <!-- Si hay un error, mostramos el componente Alerta con el mensaje -->
    <Alerta v-else-if="error">
      {{ error }}
    </Alerta>

    <!-- Si ya hay clima disponible, mostramos el componente que renderiza la información -->
    <Clima 
      v-else-if="mostrarClima"
      :clima="clima"
    />

    <!-- Si no hay nada (primera carga o sin resultados), mostramos un mensaje inicial -->
    <p v-else class="mensaje-inicial">
      Busca una ciudad para consultar el clima.
    </p>
  </div>
</template>
