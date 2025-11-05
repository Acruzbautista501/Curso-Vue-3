<script setup lang="ts">
  // Importaciones principales
  import { ref, reactive, watch, onMounted } from 'vue';
  import { uid } from 'uid';
  import type { Mascota } from './interfaces/Mascota';
  import Header from './components/Header.vue';
  import Formulario from './components/Formulario.vue';
  import Pacientes from './components/Pacientes.vue';

  // Lista reactiva de pacientes
  const pacientes = ref<Mascota[]>([])

  // Objeto reactivo para el formulario actual
  const paciente = reactive<Mascota>({
    id: null,
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: ''
  })

  // Guarda los cambios en localStorage cada vez que pacientes cambia
  watch(pacientes, () => {
     guardarLocalStorage()
  }, { deep: true })

  // Cargar datos almacenados al iniciar la app
  onMounted(() => {
    const pacientesStorage = localStorage.getItem('paciente')
    if (pacientesStorage) {
      pacientes.value = JSON.parse(pacientesStorage)
    }
  })

  // Función para guardar los pacientes en localStorage
  const guardarLocalStorage = () => {
    localStorage.setItem('paciente', JSON.stringify(pacientes.value))
  }

  // Agregar o actualizar un paciente
  const guardarPaciente = () => {
    if (paciente.id) {
      // Si existe ID → actualizar
      const { id } = paciente
      const index = pacientes.value.findIndex(p => p.id === id)
      pacientes.value[index] = { ...paciente }
    } else {
      // Si no hay ID → agregar nuevo
      pacientes.value.push({
        ...paciente,
        id: uid() // Genera un ID único
      })
    }

    // Reiniciar el formulario
    Object.assign(paciente, {
      nombre: '',
      propietario: '',
      email: '',
      alta: '',
      sintomas: '',
      id: null
    })
  }

  // Cargar un paciente en el formulario para editarlo
  const actualizarPaciente = (id: string) => {
    const pacienteEditar = pacientes.value.find(p => p.id === id)
    if (pacienteEditar) {
      Object.assign(paciente, pacienteEditar)
    }
  }

  // Eliminar paciente por ID
  const eliminarPaciente = (id: string) => {
    pacientes.value = pacientes.value.filter(p => p.id !== id)
  }

</script>

<template>
  <div class="container mx-auto mt-20">
    <!-- Encabezado principal -->
    <Header />

    <div class="mt-12 md:flex">
      <!-- Formulario de registro/edición -->
      <Formulario 
        :paciente="paciente"
        v-model:nombre="paciente.nombre"
        v-model:propietario="paciente.propietario"
        v-model:email="paciente.email"
        v-model:alta="paciente.alta"
        v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente"
        :id="paciente.id"
      />

      <!-- Listado de pacientes -->
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">
          Administra a tus pacientes
        </h3>

        <!-- Si hay pacientes registrados -->
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Información de 
            <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>

          <!-- Renderiza cada paciente -->
          <Pacientes 
            v-for="paciente in pacientes"
            :paciente="paciente"
            @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente"
          />
        </div>

        <!-- Si no hay pacientes -->
        <p v-else class="mt-10 text-2xl text-center">No hay Pacientes</p>
      </div>
    </div>
  </div>
</template>

