<script setup lang="ts">
// Importamos la interfaz para tipar correctamente las propiedades del componente
import type { Cotizacion } from '../interfaces/Moneda';

// Definimos las props que recibe el componente desde el padre
// En este caso, un objeto con los datos de la cotización
defineProps<{
  cotizacion: Cotizacion
}>()
</script>

<template>
  <!-- Contenedor principal del resultado de la cotización -->
  <div class="contenedor-resultado">
    <h2>Cotización</h2>

    <!-- Sección que muestra los datos de la criptomoneda -->
    <div class="resultado">
      <!-- Imagen de la criptomoneda obtenida desde la API -->
      <img 
        :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" 
        alt="imagen cripto"
      >

      <!-- Datos principales de la cotización -->
      <div>
        <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
        <p>Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
        <p>Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span></p>
        <p>Variación últimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
        <p>Última actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
      </div>
    </div>
  </div>
</template>
