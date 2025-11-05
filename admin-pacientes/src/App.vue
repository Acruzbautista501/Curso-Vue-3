<script setup lang="ts">
  import { ref, reactive, watch, onMounted } from 'vue';
  import { uid } from 'uid';
  import type { Mascota } from './interfaces/Mascota';
  import Header from './components/Header.vue';
  import Formulario from './components/Formulario.vue';
  import Pacientes from './components/Pacientes.vue';


  const pacientes = ref<Mascota[]>([])

  const paciente = reactive<Mascota>( {
    id: null,
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: ''
  })

  watch(pacientes, () => {
     guardarLocalStorage()
  }, {
    deep: true
  })

  onMounted(() => {
    const pacientesStorage = localStorage.getItem('paciente')
    if (pacientesStorage) {
      pacientes.value = JSON.parse(pacientesStorage)
    }
  })

  const guardarLocalStorage = () => {
    localStorage.setItem('paciente', JSON.stringify(pacientes.value))
  }

  const guardarPaciente = () => {

    if(paciente.id) {
      const {id} = paciente
      const p = pacientes.value.findIndex((paciente) => paciente.id === id)
      pacientes.value[p] = {...paciente}
    } else {
      pacientes.value.push({
        ...paciente,
        id: uid()
      }) // crea una copia para evitar referencias reactiva
    }

    Object.assign(paciente, {
      nombre: '',
      propietario: '',
      email: '',
      alta: '',
      sintomas: '',
      id: null
    })
  }

  const actualizarPaciente = (id:string) => {
    const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0] 
    if(pacienteEditar) {
      Object.assign(paciente, pacienteEditar)
    }
  }

  const eliminarPaciente = (id:string) => {
    pacientes.value = pacientes.value.filter(paciente => paciente.id !== id)
  }

</script>

<template>
  <div class="container mx-auto mt-20">
    <Header 
    />
    <div class="mt-12 md:flex">
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

      <div class=" md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">
          Administra a tus pacientes
        </h3>
        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Información de 
            <span class="text-indigo-600 font-bold">Pacientes</span>
          </p>
          <Pacientes 
            v-for="paciente in pacientes"
            :paciente ="paciente"
            @actualizar-paciente ='actualizarPaciente'
            @eliminar-paciente = 'eliminarPaciente'
          />
        </div>
        <p v-else class="mt-10 text-2xl text-center"> No hay Pacientes</p>
      </div>
    </div>
  </div>
</template>
