<script setup lang="ts">
  // Importamos funciones auxiliares para formatear datos
  import { formatearCantidad, formatearFecha } from '../helpers';

  // Importamos el tipo de datos 'Gastos' desde la interfaz TypeScript
  import type { Gastos } from '../interfaces/Presupuesto';

  // Importamos los íconos correspondientes a cada categoría de gasto
  import IconoAhorro from '../assets/img/icono_ahorro.svg'
  import IconoCasa from '../assets/img/icono_casa.svg'
  import IconoComida from '../assets/img/icono_comida.svg'
  import IconoGastos from '../assets/img/icono_gastos.svg'
  import IconoOcio from '../assets/img/icono_ocio.svg'
  import IconoSalud from '../assets/img/icono_salud.svg'
  import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

  // Diccionario que asocia cada categoría con su ícono correspondiente
  // Se usa Record<> para asegurar que las claves sean del tipo 'categoria' de la interfaz Gastos
  const diccionarioIconos: Record<Gastos['categoria'], string> = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
  }

  // Recibimos el gasto individual como prop desde el componente padre
  defineProps<{
    gasto: Gastos
  }>()

  // Definimos el evento que se emitirá cuando el usuario haga clic en un gasto
  const emit = defineEmits<{
    (e: 'seleccionar-gasto', id: number | string): void
  }>()
</script>

<template>
  <!-- Contenedor principal del gasto -->
  <div class="gasto sombra">
    
    <!-- Contenido del gasto: ícono + detalles -->
    <div class="contenido">
      <!-- Ícono según la categoría -->
      <img 
        :src="diccionarioIconos[gasto.categoria]" 
        alt="Icono Gasto" 
        class="icono"
      >

      <!-- Detalles del gasto -->
      <div class="detalles">
        <!-- Categoría del gasto -->
        <p class="categoria">{{ gasto.categoria }}</p>

        <!-- Nombre del gasto (clicable para seleccionarlo y editarlo) -->
        <p 
          class="nombre"
          @click="emit('seleccionar-gasto', gasto.id)"
        >
          {{ gasto.nombre }}
        </p>

        <!-- Fecha del gasto formateada -->
        <p class="fecha">
          <span>Fecha: </span>
          {{ formatearFecha(gasto.fecha) }}
        </p>
      </div>
    </div>

    <!-- Monto del gasto formateado -->
    <p class="cantidad">{{ formatearCantidad(Number(gasto.cantidad)) }}</p>
  </div>
</template>


<style scoped>
.gasto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.contenido {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.icono {
  width: 5rem;
}
.detalles p {
  margin: 0 0 1rem 0;
}
.categoria {
  color:var(--gris);
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}
.nombre {
  color: var(--gris-oscuro);
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
}
.fecha {
  color: var(--gris-oscuro);
  font-size: 1.6rem;
  font-weight: 900;
}
.fecha span {
  font-weight: 400;
}
.cantidad {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
}
</style>