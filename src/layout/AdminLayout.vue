<template>
  <div>
    <AppBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
</script>

<style scoped>

</style>