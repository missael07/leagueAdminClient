<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <v-data-iterator :items="players" :items-per-page="1" :search="search">
                <template #header>
                    <v-toolbar class="px-2">
                        <v-text-field v-model="search" density="comfortable" placeholder="Search"
                            prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable hide-details />
                    </v-toolbar>
                </template>
        
                <template #default="{ items }">
                    <v-container class="pa-2" fluid>
                        <v-row dense>
                            <v-col v-for="player in items" :key="player.raw.id" cols="auto" md="4">
                                <v-card class="pb-3" border flat>
                                    <v-img :src="player.raw.imgUrl" height="200" width="100%" />
        
                                    <v-list-item class="mb-2">
                                        <template #title>
                                            <strong class="text-h6 mb-2">{{ player.raw.name }}</strong>
                                        </template>
                                    </v-list-item>
        
                                    <div class="d-flex justify-space-between px-2">
                                        <div class="d-flex ml-5">
                                            <v-badge v-if="player.raw.blockedToPlay" color="rgb(var(--v-theme-error))" />
                                            <v-badge v-if="player.raw.blockedToPitch" color="rgb(var(--v-theme-warning))" />
                                            <v-badge v-if="player.raw.isReinforcement" color="rgb(var(--v-theme-success))"
                                                class="ml-6" />
                                        </div>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </template>
        
                <template #footer="{ page, pageCount, prevPage, nextPage }">
                    <div class="d-flex align-center justify-center pa-4">
                        <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                            @click="prevPage" />
        
                        <div class="mx-2 text-caption">
                            Page {{ page }} of {{ pageCount }}
                        </div>
        
                        <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                            rounded @click="nextPage" />
                    </div>
                </template>
            </v-data-iterator>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useManagerRoster from '@/pages/managers/rosters/composables/useRoster';

interface Props {
    teamId: number;
}

const props = defineProps<Props>();
const search = ref('')
const { players, getRosters } = useManagerRoster();

onMounted(async () => await getRosters(props.teamId))
</script>

<style scoped></style>