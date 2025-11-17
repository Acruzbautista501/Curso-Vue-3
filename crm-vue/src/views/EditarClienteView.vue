<script setup lang="ts">
  import ClienteService from '@/services/ClienteService'
  import { FormKit } from '@formkit/vue'
  import RouterLink from '@/components/UI/RouterLink.vue'
  import Heading from '@/components/UI/UiHeading.vue'
  import { useRouter, useRoute } from 'vue-router'
  import type { EditarCliente } from '../interfaces/Clientes'
  import { onMounted, reactive } from 'vue'

  // Acceso al router y a la ruta actual
  const router = useRouter()
  const route = useRoute()

  // ID del cliente obtenido desde los parámetros de la ruta
  const id = route.params.id as string

  // Datos del formulario (reactivo) donde se cargará la info del cliente
  const formData = reactive<EditarCliente>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: ''
  })

  // Cargar los datos del cliente al montar el componente
  onMounted(() => {
    ClienteService.obtnerCliente(id)
      .then(({ data }) => {
        // Rellena el formulario con la información existente
        Object.assign(formData, data)
      })
      .catch(error => console.log(error))
  })

  // Título recibido como prop desde la ruta
  defineProps<{
    titulo: string
  }>()

  // Envía el formulario actualizado al backend
  const handleSubmit = (data: EditarCliente) => {
    ClienteService.actualizarCliente(id, data)
      .then(() => router.push({ name: 'listado-clientes' })) // Redirige al listado
      .catch(error => console.log(error))
  }
</script>

<template>
  <div>
    <!-- Enlace para volver al listado -->
    <div class="flex justify-end">
      <RouterLink to="listado-clientes">
        Volver
      </RouterLink>
    </div>

    <!-- Título dinámico -->
    <Heading>{{ titulo }}</Heading>

    <!-- Contenedor del formulario -->
    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">

        <!-- Formulario manejado por FormKit -->
        <FormKit
          type="form"
          submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes."
          @submit="handleSubmit"
          :value="formData"
        >

          <!-- Campo: Nombre -->
          <FormKit
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Nombre del cliente es obligatorio.' }"
            v-model="formData.nombre"
          />

          <!-- Campo: Apellido -->
          <FormKit
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido de Cliente"
            validation="required"
            :validation-messages="{ required: 'El Apellido del cliente es obligatorio.' }"
            v-model="formData.apellido"
          />

          <!-- Campo: Email -->
          <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Cliente"
            validation="required|email"
            :validation-messages="{ 
              required: 'El Email del cliente es obligatorio.', 
              email: 'Coloca un email válido' 
            }"
            v-model="formData.email"
          />

          <!-- Campo: Teléfono -->
          <FormKit
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="Teléfono: XXX-XXX-XXXX"
            validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages="{ matches: 'El Formato no es válido' }"
            v-model="formData.telefono"
          />

          <!-- Campo: Empresa -->
          <FormKit
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa de Cliente"
            v-model="formData.empresa"
          />

          <!-- Campo: Puesto -->
          <FormKit
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto de Cliente"
            v-model="formData.puesto"
          />

        </FormKit>

      </div>
    </div>
  </div>
</template>

<style>
  /* Ajuste visual para evitar que FormKit limite el ancho */
  .formkit-wrapper {
    max-width: 100% !important;
  }
</style>
