<template>
    <TeamList v-if="!$vuetify.display.mobile" />
    <TeamListMobile v-else />
</template>

<script setup lang="ts">
import TeamList from '@/components/Managers/teamList/web/TeamList.vue'
import TeamListMobile from '@/components/Managers/teamList/mobile/TeamList.vue'
</script>

<style scoped>

</style>