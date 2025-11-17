<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import ClienteService from '@/services/ClienteService';
import RouterLink from '@/components/UI/RouterLink.vue';
import Heading from '@/components/UI/UiHeading.vue';
import Clientes from '@/components/UI/ClienteComp.vue';
import type { Cliente } from '../interfaces/Clientes';


const clientes = ref<Cliente[]>([])


const getClientes = () => {
  ClienteService.obtnerClientes()
    .then(({data}) => clientes.value = data )
    .catch(error => console.log('Hubo un error:',error))
}

onMounted(getClientes)

defineProps<{
  titulo: string
}>()

const existenClientes = computed(() => {
  return clientes.value.length > 0
})

const actualizarEstado = (id: string, estado: number) => {
  ClienteService.cambiarEstado(id, estado)
    .then(() => {
      const cliente = clientes.value.find(c => c.id === id)
      if (cliente) {
        cliente.estado = estado
      }
    })
    .catch(error => console.log(error))
}

const eliminarCliente = (id: string) => {
  ClienteService.eliminarCliente(id)
    .then(() => {
      clientes.value = clientes.value.filter(cliente => cliente.id !== id)
    })
    .catch(error => console.log(error))
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="agregar-cliente">
        Agregar Cliente
      </RouterLink>
    </div>
    <Heading>{{ titulo }}</Heading>
    <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                        <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                        <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                        <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                    </tr>
                    </thead>
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
    <p v-else class="text-center mt-10">
      No hay clientes
    </p>
  </div>
</template>
