<script setup lang="ts">
  /* Importamos herramientas de Vue */
  import { ref } from 'vue'

  /* Componente hijo para mostrar mensajes de error */
  import Alerta from './Alerta.vue'

  /* 
    Estado reactivo del presupuesto:
      - Puede ser un número o una cadena vacía (estado inicial)
  */
  const presupuesto = ref<number | ''>(0)

  /* Estado para almacenar mensajes de error */
  const error = ref<string>('')

  /* 
    Definición del evento personalizado que emitirá este componente:
      - Enviará el presupuesto al componente padre
  */
  const emit = defineEmits<{
    (e: 'definir-presupuesto', cantidad: number): void
  }>()

  /* 
    Función que valida y emite el presupuesto:
      - Si el valor es inválido, muestra un error temporal
      - Si es válido, emite el evento con la cantidad
  */
  const definirPresupuesto = () => {
    if (presupuesto.value === '' || presupuesto.value <= 0) {
      error.value = 'Presupuesto no válido'

      // Limpia el mensaje después de 3 segundos
      setTimeout(() => {
        error.value = ''
      }, 3000)
      return
    }

    // Envía el valor al componente padre
    emit('definir-presupuesto', presupuesto.value)
  }
</script>

<template>
  <!-- Formulario principal para definir el presupuesto -->
  <form 
    class="presupuesto"
    @submit.prevent="definirPresupuesto" 
  > <!-- @submit.prevent="definirPresupuesto": Evita el envío por defecto -->
    <!-- Muestra alerta si hay un error -->
    <Alerta v-if="error">
      {{ error }}
    </Alerta>

    <!-- Campo para introducir el presupuesto -->
    <div class="campo">
      <label for="nuevo-presupuesto">Definir Presupuesto</label>
      <input 
        id="nuevo-presupuesto"
        class="nuevo-presupuesto"
        placeholder="Añade tu presupuesto"
        type="number"
        min="0"
        v-model.number="presupuesto" 
      /> <!-- v-model.number="presupuesto": Enlaza el valor como número -->
    </div>

    <!-- Botón para confirmar el presupuesto -->
    <input type="submit" value="Definir Presupuesto" />
  </form>
</template>

<style scoped>
  .presupuesto{
    width: 100%;
  } 
  .campo {
    display: grid;
    gap: 2rem;
  }
  .presupuesto label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--azul);
  }
  .presupuesto input[type="number"] {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
  }
  .presupuesto input[type="submit"] {
    background-color: var(--azul);
    border: none;
    padding: 1rem;
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
    color: var(--blanco);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
  }  
  .presupuesto input[type="submit"]:hover {
    background-color: #1048A4;
    cursor: pointer;
  }
</style>