<script setup lang="ts">
  import { FormKit } from '@formkit/vue';
  import RouterLink from '@/components/UI/RouterLink.vue';
  import Heading from '@/components/UI/UiHeading.vue';

  defineProps<{
    titulo: string
  }>()

  const handleSubmit = (data: string) => {
    console.log(data)
  }
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="inicio">
        Volver
      </RouterLink>
    </div>    
    <Heading>{{ titulo }}</Heading>
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Agregar Cliente"
          incomplete-message="No se pudo enviar, revisa los mensajes."
          @submit="handleSubmit"
        >
          <FormKit
            type="text" 
            label="Nombre"
            name="nombre"
            placeholder="Nombre de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Nombre del cliente es obligatorio.' }"
          />  
          <FormKit
            type="text" 
            label="Apellido"
            name="apellido"
            placeholder="Apellido de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Apellido del cliente es obligatorio.' }"
          />   
          <FormKit
            type="email" 
            label="Email"
            name="email"
            placeholder="Email de Cliente"
            validation="required|email"
            :validation-messages="{ required: 'El Email del cliente es obligatorio.', email: 'Coloca un email válido' }"
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
          />
          <FormKit
            type="text" 
            label="Empresa"
            name="empresa"
            placeholder="Empresa de Cliente"
          />    
          <FormKit
            type="text" 
            label="Puesto"
            name="puesto" 
            placeholder="Puesto de Cliente"
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
