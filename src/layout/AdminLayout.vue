<template>
  <div>
    <AppBar />
    <FooterBar v-if="$vuetify.display.mobile" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import FooterBar from '@/components/FooterBar.vue';
</script>

<style scoped>

</style>