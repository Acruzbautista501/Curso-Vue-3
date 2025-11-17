<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import type { Busqueda } from '../interfaces/Clima';
  import Alerta from './Alerta.vue';

  /* Estado reactivo que almacena los valores del formulario */
  const busqueda = reactive<Busqueda>({
    ciudad: '',
    pais: ''
  })

  /* Mensaje de error para validar el formulario */
  const error = ref<string>('')

  /* Declaración del evento que emitirá el formulario al componente padre */
  const emit = defineEmits<{
    (e: 'obtener-clima', consulta: Busqueda): void
  }>()

  /* Lista de países disponibles para el select */
  const paises = [
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'PE', nombre: 'Perú' }
  ]

  /* Valida el formulario y emite la búsqueda si todo está correcto */
  const consultarClima = () => {
    // Verifica que ningún campo esté vacío
    if (Object.values(busqueda).includes('')) {
      error.value = 'Todos los campos son obligatorios'
      return
    }

    // Limpia errores y envía la información al componente padre
    error.value = ''
    emit('obtener-clima', busqueda)
  }
</script>

<template>
  <form
    class="formulario"
    @submit.prevent="consultarClima"  <!-- Evita recargar la página -->
  >
    <!-- Muestra un mensaje si hay error -->
    <Alerta v-if="error">
      {{ error }}
    </Alerta>

    <div class="campo">
      <label for="ciudad">Ciudad</label>

      <!-- Campo para ingresar el nombre de la ciudad -->
      <input 
        type="text"
        id="ciudad"
        placeholder="Ciudad"
        v-model="busqueda.ciudad"
      >

      <label for="pais">Ciudad</label>

      <!-- Selector de país con opciones generadas dinámicamente -->
      <select 
        id="pais"
        v-model="busqueda.pais"
      >
        <option value="">-- Seleccione un país</option>

        <option 
          v-for="pais in paises"
          :value="pais.codigo"
        >
          {{ pais.nombre }}
        </option>
      </select>
    </div>

    <!-- Botón para enviar el formulario -->
    <input type="submit" value="Consultar Clima" />
  </form>
</template>
