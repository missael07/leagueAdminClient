<template>
    <v-bottom-navigation v-model="value" color="primary" horizontal :elevation="23">
        <v-btn v-for="item in menu" :key="item.menuItem" :to="item.menuRoute" router
            :class="{ 'v-list-item--active': isActive(item.menuRoute) }" class="nav-item">
            <v-icon :color="isActive(item.menuRoute) ? 'white' : 'primary'">
                {{ item.menuIcon }}
            </v-icon>

            {{ item.menuItem }}
        </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(1);
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