<script setup lang="ts">
  import { FormKit } from '@formkit/vue';
  import RouterLink from '@/components/UI/RouterLink.vue';
  import Heading from '@/components/UI/UiHeading.vue';

  defineProps<{
    titulo: string
  }>()
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
      <FormKit
        type="form"
      >
      </FormKit>
    </div>
  </div>
</template>
