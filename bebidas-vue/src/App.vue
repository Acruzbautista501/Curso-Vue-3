<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './HeaderComponent.vue';

</script>

<template>
  <HeaderComponent />
  <main class="container mx-auto mt-10">
    <RouterView />
  </main>
</template>


