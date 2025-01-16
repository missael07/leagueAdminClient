<template>
    <AdminTeamList v-if="!$vuetify.display.mobile" />
    <AdminTeamListMobile v-else />
</template>

<script setup lang="ts">
import AdminTeamList from '@/components/admin/teamList/web/AdminTeamList.vue'
import AdminTeamListMobile from '@/components/admin/teamList/mobile/AdminTeamList.vue'
</script>

<style scoped>

</style>