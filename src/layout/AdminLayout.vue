<template>
  <div>
    <AppBar />
    <main>
      <!-- Contenido específico de la página -->
      <!-- <Loader v-if="displayLoader" /> -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import Loader from '@/components/Loader.vue';
import useLoader from '@/composables/useLoader';
import { watch } from 'vue';

const { displayLoader } = useLoader();

watch(displayLoader, () => {
  console.log('displayLoader', displayLoader.value);
});
</script>

<style scoped>

</style>