<script setup lang="ts">
import { computed } from 'vue';
import type { Cliente } from '../../interfaces/Clientes';
import { RouterLink } from 'vue-router';

// Props recibidas desde el componente padre
const props = defineProps<{
  cliente: Cliente
}>()

// Eventos que este componente puede emitir al padre
const emit = defineEmits<{
  (e: 'actualizar-estado', id: string, estado: number): void   // Cambia el estado del cliente (activo/inactivo)
  (e: 'eliminar-cliente', id: string): void                   // Solicita eliminar un cliente
}>()

// Computed: nombre completo del cliente
const nombreCliente = computed(() => {
  return props.cliente.nombre + ' ' + props.cliente.apellido
})

// Computed: estado actual del cliente (activo:1 / inactivo:0)
const estadoCliente = computed(() => {
  return props.cliente.estado
})
</script>

<template>
  <tr>
    <!-- Columna Nombre y Email -->
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
      <p class="text-gray-500">{{ cliente.email }}</p>
    </td>

    <!-- Columna Empresa y Puesto -->
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
      <p class="text-gray-600">{{ cliente.puesto }}</p>
    </td>

    <!-- Columna Estado con botón para cambiarlo -->
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button 
        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
        :class="[estadoCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
        @click="emit('actualizar-estado', cliente.id, cliente.estado ? 0 : 1)"
      >
        {{ estadoCliente ? 'Activo' : 'Inactivo'}}
      </button>
    </td>

    <!-- Columna Acciones: Editar y Eliminar -->
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
      <!-- Enlace a la vista de edición -->
      <RouterLink 
        :to="{ name: 'editar-cliente', params:{id: cliente.id}}"
        class="text-indigo-600 hover:text-indigo-900 mr-5"
      >
        Editar
      </RouterLink>

      <!-- Botón para eliminar cliente -->
      <button 
        class="text-red-600 hover:text-red-900"
        @click="emit('eliminar-cliente', cliente.id)"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>
