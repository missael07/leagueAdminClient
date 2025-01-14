<template>
    <TeamList v-if="!$vuetify.display.mobile" />
    <TeamListMobile v-else />
</template>

<script setup lang="ts">
import TeamList from '@/components/teamList/web/TeamList.vue';
import TeamListMobile from '@/components/teamList/mobile/TeamList.vue';
</script>

<style scoped>

</style>