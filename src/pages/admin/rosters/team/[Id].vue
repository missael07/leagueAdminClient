<template>
    <AdminTeam v-if="!$vuetify.display.mobile" />
    <AdminTeamMobile v-else />
</template>

<script setup lang="ts">
import AdminTeam from '@/components/admin/team/web/AdminTeam.vue';
import AdminTeamMobile from '@/components/admin/team/mobile/AdminTeam.vue';
</script>

<style scoped></style>