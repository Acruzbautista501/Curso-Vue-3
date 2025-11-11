<script setup lang="ts">
  // Importaciones de Vue y tipos de datos
  import { reactive, computed } from 'vue';
  import type { Mascota, Alertas } from '../interfaces/Mascota';
  import Alerta from './Alerta.vue';

  // Estado reactivo para manejar alertas en el formulario
  const alerta = reactive<Alertas>({
    tipo: '',       // Tipo de alerta: 'error' o 'exito'
    mensaje: ''     // Mensaje a mostrar en la alerta
  })

  // Props que recibe el componente (paciente actual)
  const props = defineProps<{ paciente: Mascota }>()

  // Asignamos los props a una constante para fácil acceso
  const pacienteProps = props.paciente

  // Eventos que el componente puede emitir hacia el padre
  const emit = defineEmits<{
    (e: 'update:nombre', value: string): void
    (e: 'update:propietario', value: string): void
    (e: 'update:email', value: string): void
    (e: 'update:alta', value: string): void
    (e: 'update:sintomas', value: string): void
    (e: 'guardar-paciente'): void
  }>()

  // Función para validar el formulario antes de guardar
  const validar = () => {
    // Verifica si algún campo está vacío
    const pacienteValidar = Object.values(pacienteProps).includes('');
    if (pacienteValidar) {
      alerta.mensaje = 'Todos los campos son obligatorios'
      alerta.tipo = 'error'
      return
    }

    // Emite el evento para guardar el paciente
    emit('guardar-paciente')

    // Muestra mensaje de éxito
    alerta.mensaje = 'Paciente almacenado correctamente'
    alerta.tipo = 'exito'

    // Limpiar alerta después de 3 segundos
    setTimeout(() => {
      Object.assign(alerta, {
        tipo: '',
        mensaje: ''
      })
    }, 3000)
  }

  // Detecta si se está editando un paciente (si tiene id)
  const editando = computed(() => {
    return pacienteProps.id
  })
</script>

<template>
  <div class="md:w-1/2">
    <!-- Título principal -->
    <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Añade Pacientes y
      <span class="text-indigo-600 font-bold">Adminístralos</span>
    </p>

    <!-- Alerta de validación o confirmación -->
    <Alerta 
      v-if="alerta.mensaje"
      :alerta="alerta"
    />

    <!-- Formulario principal -->
    <form
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
      @submit.prevent="validar"
    >
      <!-- Campo: Nombre Mascota -->
      <div class="mb-5">
        <label 
          for="mascota"
          class="text-gray-700 uppercase font-bold"
        >
          Nombre Mascota
        </label>
        <input 
          id="mascota"
          type="text"
          placeholder="Nombre de la mascota"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="paciente.nombre"
        />
      </div>

      <!-- Campo: Propietario -->
      <div class="mb-5">
        <label 
          for="propietario"
          class="text-gray-700 uppercase font-bold"
        >
          Nombre Propietario
        </label>
        <input 
          id="propietario"
          type="text"
          placeholder="Nombre del propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="paciente.propietario"
        />
      </div>

      <!-- Campo: Email -->
      <div class="mb-5">
        <label 
          for="email"
          class="text-gray-700 uppercase font-bold"
        >
          Email
        </label>
        <input 
          id="email"
          type="email"
          placeholder="Email del propietario"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="paciente.email"
        />
      </div>

      <!-- Campo: Fecha de alta -->
      <div class="mb-5">
        <label 
          for="alta"
          class="text-gray-700 uppercase font-bold"
        >
          Alta
        </label>
        <input 
          id="alta"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          v-model="paciente.alta"
        />
      </div>     

      <!-- Campo: Síntomas -->
      <div class="mb-5">
        <label 
          for="sintomas"
          class="text-gray-700 uppercase font-bold"
        >
          Síntomas
        </label>
        <textarea
          id="sintomas"
          placeholder="Describe los síntomas"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md h-40"
          v-model="paciente.sintomas"
        />
      </div> 

      <!-- Botón principal (editar o registrar) -->
      <input 
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        :value="[editando ? 'Guardar Cambios' : 'Registrar Paciente']"
      />        
    </form>
  </div>
</template>
