<template>
  <v-app>
    <loader v-if="displayLoader" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import loader from "@/components/Loader.vue";
import { useTheme } from "vuetify";
import useLoader from '@/composables/useLoader';

const { displayLoader } = useLoader();
const theme = useTheme();
theme.global.name.value = localStorage.getItem('theme') || 'light';
</script>
