<script setup lang="ts">
  // Importación de funciones reactivas del núcleo de Vue
  import { ref, reactive, watch, onMounted } from 'vue'
  
  // Importa el generador de identificadores únicos
  import { uid } from 'uid'

  // Importa la interfaz de tipo para definir la estructura de una Mascota
  import type { Mascota } from './interfaces/Mascota'

  // Importa los componentes del proyecto
  import Header from './components/Header.vue'
  import Formulario from './components/Formulario.vue'
  import Pacientes from './components/Pacientes.vue'

  // Lista reactiva que almacena todas las mascotas (pacientes)
  const pacientes = ref<Mascota[]>([])

  // Objeto reactivo para manejar el formulario de una sola mascota
  const paciente = reactive<Mascota>({
    id: null,
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: ''
  })

  // Observa cambios en la lista de pacientes y guarda en localStorage automáticamente
  watch(pacientes, () => {
     guardarLocalStorage()
  }, { deep: true })

  // Carga los pacientes desde localStorage al iniciar la aplicación
  onMounted(() => {
    const pacientesStorage = localStorage.getItem('paciente')
    if (pacientesStorage) {
      pacientes.value = JSON.parse(pacientesStorage)
    }
  })

  // Guarda la lista de pacientes actual en localStorage
  const guardarLocalStorage = () => {
    localStorage.setItem('paciente', JSON.stringify(pacientes.value))
  }

  // Crea o actualiza un paciente en la lista
  const guardarPaciente = () => {
    if (paciente.id) {
      // Si el paciente ya existe, se actualiza
      const { id } = paciente
      const index = pacientes.value.findIndex(p => p.id === id)
      pacientes.value[index] = { ...paciente }
    } else {
      // Si es un nuevo paciente, se agrega con un id único
      pacientes.value.push({
        ...paciente,
        id: uid() 
      })
    }

    // Limpia el formulario después de guardar
    Object.assign(paciente, {
      nombre: '',
      propietario: '',
      email: '',
      alta: '',
      sintomas: '',
      id: null
    })
  }

  // Carga la información de un paciente en el formulario para edición
  const actualizarPaciente = (id: string) => {
    const pacienteEditar = pacientes.value.find(p => p.id === id)
    if (pacienteEditar) {
      Object.assign(paciente, pacienteEditar)
    }
  }

  // Elimina un paciente por su id
  const eliminarPaciente = (id: string) => {
    pacientes.value = pacientes.value.filter(p => p.id !== id)
  }
</script>

<template>
  <!-- Contenedor principal -->
  <div class="container mx-auto mt-20">

    <!-- Encabezado principal -->
    <Header />

    <!-- Sección principal con formulario y listado -->
    <div class="mt-12 md:flex">

      <!-- Formulario para agregar o editar pacientes -->
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

      <!-- Listado de pacientes registrados -->
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">
          Administra a tus pacientes
        </h3>

        <!-- Si hay pacientes, muestra la lista -->
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Información de 
            <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>

          <!-- Recorre y muestra cada paciente -->
          <Pacientes 
            v-for="paciente in pacientes"
            :paciente="paciente"
            @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente"
          />
        </div>

        <!-- Si no hay pacientes, muestra un mensaje -->
        <p v-else class="mt-10 text-2xl text-center">No hay Pacientes</p>
      </div>
    </div>
  </div>
</template>
