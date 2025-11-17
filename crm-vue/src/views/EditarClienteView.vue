<script setup lang="ts">
  import ClienteService from '@/services/ClienteService';
  import { FormKit } from '@formkit/vue'
  import RouterLink from '@/components/UI/RouterLink.vue';
  import Heading from '@/components/UI/UiHeading.vue';
  import { useRouter, useRoute } from 'vue-router';
  import type { EditarCliente } from '../interfaces/Clientes';
  import { onMounted, reactive } from 'vue';

  const router = useRouter()
  const route = useRoute()

  const id = route.params.id as string

  const formData = reactive<EditarCliente>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: ''
  })

  onMounted(() => {
    ClienteService.obtnerCliente(id)
      .then(({data})=> {
        Object.assign(formData, data)
      })
      .catch(error => console.log(error))
  })

  defineProps<{
    titulo: string
  }>()

  const handleSubmit = (data: EditarCliente) => {
    ClienteService.actualizarCliente(id, data)
      .then(() => router.push({ name: 'listado-clientes'}))
      .catch(error => console.log(error))
  }
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="listado-clientes">
        Volver
      </RouterLink>
    </div>    
    <Heading>{{ titulo }}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes."
          @submit="handleSubmit"
          :value="formData"
        >
          <FormKit
            type="text" 
            label="Nombre"
            name="nombre"
            placeholder="Nombre de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Nombre del cliente es obligatorio.' }"
            v-model="formData.nombre"
          />  
          <FormKit
            type="text" 
            label="Apellido"
            name="apellido"
            placeholder="Apellido de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Apellido del cliente es obligatorio.' }"
            v-model="formData.apellido"
          />   
          <FormKit
            type="email" 
            label="Email"
            name="email"
            placeholder="Email de Cliente"
            validation="required|email"
            :validation-messages="{ required: 'El Email del cliente es obligatorio.', email: 'Coloca un email válido' }"
            v-model="formData.email"
          /> 
          <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ 
              matches: 'El Formato no es válido'
            }"
            v-model="formData.telefono"
          />
          <FormKit
            type="text" 
            label="Empresa"
            name="empresa"
            placeholder="Empresa de Cliente"
            v-model="formData.empresa"
          />    
          <FormKit
            type="text" 
            label="Puesto"
            name="puesto" 
            placeholder="Puesto de Cliente"
            v-model="formData.puesto"
          />         
          <!-- <FormKit
            type="submit" 
            label="Agregar Cliente"
          />     -->
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
  .formkit-wrapper {
    max-width: 100% !important;
  }
</style>
