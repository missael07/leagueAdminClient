<template>
    <Team v-if="!$vuetify.display.mobile" />
    <TeamMobile v-else />
</template>

<script setup lang="ts">
import Team from '@/components/Managers/team/web/Team.vue';
import TeamMobile from '@/components/Managers/team/mobile/Team.vue';
</script>

<style scoped>

</style>