<script setup lang="ts">
  // Recibimos la propiedad 'filtro' desde el componente padre
  // Representa la categoría actualmente seleccionada en el filtro
  defineProps<{
    filtro: string
  }>()

  // Definimos el evento que este componente puede emitir
  const emit = defineEmits<{
    // Evento para actualizar el valor del filtro seleccionado
    (e: 'update:filtro', value: string): void
  }>()
</script>

<template>
  <!-- Contenedor principal del filtro -->
  <div class="filtros sombra contenedor">
    <form>
      <div class="campo">
        <!-- Etiqueta descriptiva del select -->
        <label for="filtro">Filtrar Gastos</label>

        <!-- Menú desplegable para seleccionar una categoría -->
        <select 
          id="filtro"
          :value="filtro" 
          @input="emit('update:filtro', ($event.target as HTMLSelectElement).value)"
        >           
        <!-- Vinculamos el valor actual del filtro -->
        <!-- Emitimos el nuevo valor seleccionado al componente padre -->

          <!-- Opciones de categorías disponibles -->
          <option value="">-- Seleccione --</option>
          <option value="ahorro">Ahorro</option>
          <option value="comida">Comida</option>
          <option value="casa">Casa</option>
          <option value="gastos">Gastos Varios</option>
          <option value="ocio">Ocio</option>
          <option value="salud">Salud</option>
          <option value="suscripciones">Suscripciones</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .filtros {
    margin-top: 10rem;
  }
  .filtros .campo {
    display: flex;
    align-items: center;
    gap:2rem;
  }
  .filtros label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro)
  }
  .filtros select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(-gris-claro);
    text-align: center;
  }
</style>