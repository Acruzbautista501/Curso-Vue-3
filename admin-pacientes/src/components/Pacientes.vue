<script setup lang="ts">
import type { Mascota } from '../interfaces/Mascota';

// Prop recibido: un paciente individual
defineProps<{
  paciente: Mascota
}>()

// Eventos que se emiten al padre (editar o eliminar)
const emit = defineEmits<{
  (e: 'actualizar-paciente', id: string): void
  (e: 'eliminar-paciente', id: string): void
}>()
</script>

<template>
  <!-- Tarjeta individual del paciente -->
  <div class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <!-- Campo: ID -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      ID:
      <span class="font-normal normal-case">
        {{ paciente.id }}
      </span>
    </p>

    <!-- Campo: Nombre Mascota -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      Nombre:
      <span class="font-normal normal-case">
        {{ paciente.nombre }}
      </span>
    </p>

    <!-- Campo: Propietario -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      Propietario:
      <span class="font-normal normal-case">
        {{ paciente.propietario }}
      </span>
    </p>

    <!-- Campo: Email -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      Email:
      <span class="font-normal normal-case">
        {{ paciente.email }}
      </span>
    </p>

    <!-- Campo: Fecha de Alta -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      Fecha Alta:
      <span class="font-normal normal-case">
        {{ paciente.alta }}
      </span>
    </p>

    <!-- Campo: Síntomas -->
    <p class="font-bold mb-3 text-gray-700 uppercase">
      Síntomas:
      <span class="font-normal normal-case">
        {{ paciente.sintomas }}
      </span>
    </p>

    <!-- Botones de acción (Editar / Eliminar) -->
    <div class="grid md:grid-cols-2 gap-5 mt-10">
      <!-- Botón Editar -->
      <button 
        type="button"
        class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        @click="emit('actualizar-paciente', paciente.id ?? '')"
      >
        Editar
      </button>

      <!-- Botón Eliminar -->
      <button 
        type="button"
        class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
        @click="emit('eliminar-paciente', paciente.id ?? '')"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>
