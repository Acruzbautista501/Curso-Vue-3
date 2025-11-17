<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import ClienteService from '@/services/ClienteService'
import RouterLink from '@/components/UI/RouterLink.vue'
import Heading from '@/components/UI/UiHeading.vue'
import Clientes from '@/components/UI/ClienteComp.vue'
import type { Cliente } from '../interfaces/Clientes'

// Lista reactiva donde se guardarán los clientes obtenidos desde la API
const clientes = ref<Cliente[]>([])

// Obtiene los clientes desde el servicio y los asigna al estado local
const getClientes = () => {
  ClienteService.obtnerClientes()
    .then(({ data }) => clientes.value = data)
    .catch(error => console.log('Hubo un error:', error))
}

// Ejecuta la consulta al cargar el componente
onMounted(getClientes)

// Recibe el título enviado desde la ruta como prop
defineProps<{
  titulo: string
}>()

// Indica si hay clientes para mostrar
const existenClientes = computed(() => {
  return clientes.value.length > 0
})

// Cambia el estado (activo/inactivo) de un cliente
const actualizarEstado = (id: string, estado: number) => {
  ClienteService.cambiarEstado(id, estado)
    .then(() => {
      // Buscamos el cliente y actualizamos su estado localmente
      const cliente = clientes.value.find(c => c.id === id)
      if (cliente) cliente.estado = estado
    })
    .catch(error => console.log(error))
}

// Elimina un cliente tanto en el servidor como en el listado local
const eliminarCliente = (id: string) => {
  ClienteService.eliminarCliente(id)
    .then(() => {
      // Filtra la lista para remover el cliente eliminado
      clientes.value = clientes.value.filter(cliente => cliente.id !== id)
    })
    .catch(error => console.log(error))
}
</script>

<template>
  <div>
    <!-- Botón para ir a la pantalla de agregar cliente -->
    <div class="flex justify-end">
      <RouterLink to="agregar-cliente">
        Agregar Cliente
      </RouterLink>
    </div>

    <!-- Título dinámico pasado desde la ruta -->
    <Heading>{{ titulo }}</Heading>

    <!-- Tabla de clientes si existen registros -->
    <div v-if="existenClientes" class="flow-root mx-auto mt-10 p-5 bg-white shadow">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                <th class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                <th class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                <th class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
              </tr>
            </thead>

            <!-- Renderizado de cada cliente mediante un componente -->
            <tbody class="divide-y divide-gray-200 bg-white">
              <Clientes
                v-for="cliente in clientes"
                :key="cliente.id"
                :cliente="cliente"
                @actualizar-estado="actualizarEstado"
                @eliminar-cliente="eliminarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay clientes en la lista -->
    <p v-else class="text-center mt-10">
      No hay clientes
    </p>
  </div>
</template>
