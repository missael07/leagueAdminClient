<template>
  <v-navigation-drawer
    v-if="!$vuetify.display.mobile"
    expand-on-hover
    rail
    color="background" :dark="false"
  >
    <NavBar />
  </v-navigation-drawer>
  <v-app-bar class="d-flex justify-end" color="primary">
    <v-spacer />
    <div class="icon-container d-flex justify-end">
      <v-icon
      :icon="theme.global.current.value.dark
          ? 'mdi-white-balance-sunny'
          : 'mdi-weather-night'
        "
        color="white"
        @click="toggleTheme"
        />
        <v-icon
          :icon="icons.signOutIcon"
          color="white"
          @click="signOut"
        />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import useToggleTheme from '@/composables/useToggleTheme';
import { icons } from '@/utils/consts/icons';

const { theme, toggleTheme } = useToggleTheme();

const signOut = () => {
  localStorage.removeItem('authToken');
  window.location.reload();
}

</script>

<style scoped>
.icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.icon-container .v-icon {
    padding: 2rem;
}

.tool {
    background: transparent;
    box-shadow: none !important;
}

.user-companies {
    max-width: 20rem;
}
</style>