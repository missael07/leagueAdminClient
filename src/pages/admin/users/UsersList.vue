<template>
    <UsersListWeb v-if="!$vuetify.display.mobile" />
    <UsersListMobile v-else />
</template>

<script setup lang="ts">
import UsersListWeb from '@/components/admin/users/web/UsersListWeb.vue';
import UsersListMobile from '@/components/admin/users/mobile/UsersListMobile.vue';
</script>
