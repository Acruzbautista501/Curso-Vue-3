<script setup lang="ts">
  import Header from './components/Header.vue';
  import Formulario from './components/Formulario.vue';
  import { ref, reactive } from 'vue';
  import type { Mascota } from './interfaces/Mascota';
  import Pacientes from './components/Pacientes.vue';
  Pacientes

  const pacientes = ref<Mascota[]>([])

  const paciente = reactive<Mascota>( {
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: ''
  })

const guardarPaciente = () => {
  pacientes.value.push({...paciente}) // crea una copia para evitar referencias reactivas

  paciente.nombre = ''
  paciente.propietario = ''
  paciente.email = ''
  paciente.alta
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
            :paciente="paciente"
          />
        </div>
        <p v-else class="mt-10 text-2xl text-center"> No hay Pacientes</p>
      </div>
    </div>
  </div>
</template>
