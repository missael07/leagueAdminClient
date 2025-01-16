<template>
    <RegisterTeams v-if="!$vuetify.display.mobile" />
    <RegisterTeamsMobile v-else />
</template>

<script setup lang="ts">
import RegisterTeamsMobile from '@/components/admin/teams/mobile/RegisterTeamsMobile.vue';
import RegisterTeams from '@/components/admin/teams/web/RegisterTeams.vue';
</script>
