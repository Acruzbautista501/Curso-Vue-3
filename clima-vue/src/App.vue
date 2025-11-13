<script setup lang="ts">
import Alerta from './components/Alerta.vue';
import Clima from './components/Clima.vue';
import Formulario from './components/Formulario.vue';
import Spinner from './components/Spinner.vue';
import useClima from './composables/useClima';

const { obtenerClima, clima, cargandoClima, mostrarClima, error } = useClima()
</script>

<template>
  <h1 class="titulo">Buscador de clima</h1>

  <div class="contenedor buscador-clima">
    <Formulario @obtener-clima="obtenerClima" />

    <!-- Mostrar spinner mientras se carga -->
    <Spinner v-if="cargandoClima" />
    <Alerta v-else-if="error">
      {{ error }}
    </Alerta>

    <!-- Mostrar resultado cuando hay clima disponible -->
    <Clima 
      v-else-if="mostrarClima"
      :clima="clima"
    />

    <!-- Mostrar mensaje inicial o vacío -->
    <p v-else class="mensaje-inicial">Busca una ciudad para consultar el clima.</p>
  </div>
</template>
