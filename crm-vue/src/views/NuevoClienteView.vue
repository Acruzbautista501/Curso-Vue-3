<script setup lang="ts">
  // Servicio para manejar operaciones relacionadas con clientes (CRUD)
  import ClienteService from '@/services/ClienteService';

  // Componente de formularios de FormKit
  import { FormKit } from '@formkit/vue'

  // Componente para navegación tipo router-link personalizado
  import RouterLink from '@/components/UI/RouterLink.vue';

  // Componente para mostrar encabezados estilizados
  import Heading from '@/components/UI/UiHeading.vue';

  // Hook de Vue Router para redireccionamiento programático
  import { useRouter } from 'vue-router';

  // Tipado TypeScript para crear un cliente
  import type { CrearCliente } from '../interfaces/Clientes';

  // Instancia de router para navegación programática
  const router = useRouter()

  // Recibir props desde el componente padre
  defineProps<{
    titulo: string
  }>()

  /**
   * Maneja el envío del formulario de creación de cliente.
   * @param data - Datos ingresados en el formulario
   */
  const handleSubmit = (data: CrearCliente) => {
    // Asignar estado inicial del cliente
    data.estado = 1

    // Llamada al servicio para agregar un nuevo cliente
    ClienteService.agregarCliente(data)
      .then(respuesta => {
        console.log(respuesta) // Log de confirmación en consola

        // Redirigir al listado de clientes después de agregar
        router.push({ name: 'listado-clientes' })
      })
      .catch(error => console.log(error)) // Manejo de errores
  }
</script>

<template>
  <div>
    <!-- Botón para regresar al listado de clientes -->
    <div class="flex justify-end">
      <RouterLink to="listado-clientes">
        Volver
      </RouterLink>
    </div>    

    <!-- Título de la página recibido vía props -->
    <Heading>{{ titulo }}</Heading>

    <!-- Contenedor principal del formulario -->
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">

        <!-- Formulario FormKit -->
        <FormKit
          type="form"
          submit-label="Agregar Cliente"
          incomplete-message="No se pudo enviar, revisa los mensajes."
          @submit="handleSubmit"
        >
          <!-- Campo Nombre -->
          <FormKit
            type="text" 
            label="Nombre"
            name="nombre"
            placeholder="Nombre de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Nombre del cliente es obligatorio.' }"
          />  

          <!-- Campo Apellido -->
          <FormKit
            type="text" 
            label="Apellido"
            name="apellido"
            placeholder="Apellido de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Apellido del cliente es obligatorio.' }"
          />   

          <!-- Campo Email -->
          <FormKit
            type="email" 
            label="Email"
            name="email"
            placeholder="Email de Cliente"
            validation="required|email"
            :validation-messages="{ required: 'El Email del cliente es obligatorio.', email: 'Coloca un email válido' }"
          /> 

          <!-- Campo Teléfono con expresión regular -->
          <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'El Formato no es válido' }"
          />

          <!-- Campo Empresa -->
          <FormKit
            type="text" 
            label="Empresa"
            name="empresa"
            placeholder="Empresa de Cliente"
          />    

          <!-- Campo Puesto -->
          <FormKit
            type="text" 
            label="Puesto"
            name="puesto" 
            placeholder="Puesto de Cliente"
          />         
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style>
  /* Ajuste máximo de ancho del contenedor de FormKit */
  .formkit-wrapper {
    max-width: 100% !important;
  }
</style>
