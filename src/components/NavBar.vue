<template>
  <!-- <v-list>
      <v-list-item
        :subtitle="user?.email"
        :title="userName"
      >
      <template v-slot:prepend="{  }">
        <v-avatar size="35" class="bg-primary pointer" >
          <span  class="text-h6">{{ avatarName }}</span>
        </v-avatar>
      </template>
</v-list-item>
</v-list> -->
  <v-avatar size="35" class="bg-primary pointer ml-2">
    <span class="text-h6">MP</span>
  </v-avatar>
  <v-divider />
  <v-list density="compact" nav>
    <v-list-item v-for="item in menu" :key="item.menuItem" :to="item.menuRoute" router :title="item.menuItem"
      :value="item.menuRoute" :class="{ 'v-list-item--active': isActive(item.menuRoute) }" class="nav-item">
      <template #prepend>
        <v-icon :color="isActive(item.menuRoute) ? 'white' : 'primary'">
          {{ item.menuIcon }}
        </v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useMenu from '@/composables/useMenu';
import { useRoute } from 'vue-router';

const { getMenu, menu } = useMenu();
const route = useRoute();

onMounted(async () => {
  await getMenu();
});

const isActive = (path: string) => {
  const splittedPath = path.split('/');
  return route.path.includes(`/${splittedPath[2]}`);
}

</script>

<style scoped>
.v-list-item--active {
  border-radius: 0;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-inline-end: 10px;
}
</style>