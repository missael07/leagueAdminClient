<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <!-- Header -->
            <v-card-title class="d-flex justify-space-between align-center">
                <div>
                    <h2 class="font-weight-bold">
                        {{ team?.name }}
                    </h2>
                    <small class="text--secondary">{{ team.branch }}</small>
                    <small class="text--secondary ml-4">{{ getCategorytext(team.category) }}</small>
                </div>
                <div class="d-flex align-center">
                    <v-chip :color="getStatusChipColor(team?.isActive)" class="mr-2" small>
                        {{ getChiptext(team?.isActive) }}
                    </v-chip>
                    <v-chip :color="getStatusChipColor(team?.isPaid)" small>
                        {{ getPaidtext(team?.isPaid) }}
                    </v-chip>
                </div>
            </v-card-title>
            <v-row v-for="manager in team?.managers" :key="manager.email" dense class="mb-3">
                <v-col cols="12">
                    <v-row align="center">
                        <v-col>
                            <h4 class="font-weight-medium mb-1">
                                {{ manager.name }}
                            </h4>
                        </v-col>
                        <v-col>
                            <small>{{ manager.phoneNumber }}</small>
                        </v-col>
                        <v-col>
                            <strong>{{ getRoleText(manager.role) }}</strong>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider class="my-3" />
            <!-- Add Player Button -->
            <v-row justify="center">
                <v-btn color="primary" class="font-weight-bold mb-2 mt-2" to="/managers/rosters/createrosterplayer">
                    <v-icon left>
                        mdi-plus
                    </v-icon>
                    AGREGAR JUGADOR/A
                </v-btn>
            </v-row>
            <div class="d-flex justify-space-around mt-5">
                <v-badge color="rgb(var(--v-theme-error))">
                    <template #badge>
                        No puede Jugar
                    </template>
                </v-badge>
                <v-badge color="rgb(var(--v-theme-warning))">
                    <template #badge>
                        No puede Pitchar
                    </template>
                </v-badge>
                <v-badge color="rgb(var(--v-theme-success))">
                    <template #badge>
                        Refuerzo
                    </template>
                </v-badge>
            </div>
            <!-- Players Section -->
            <v-card class="mt-5">
                <v-data-iterator :items="team.rosters" :items-per-page="2" :search="search">
                    <template #header>
                        <v-toolbar class="px-2">
                            <v-text-field v-model="search" density="comfortable" placeholder="Search"
                                prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                                hide-details />
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
                                                <v-badge v-if="player.raw.blockedToPlay"
                                                    color="rgb(var(--v-theme-error))" />
                                                <v-badge v-if="player.raw.blockedToPitch"
                                                    color="rgb(var(--v-theme-warning))" />
                                                <v-badge v-if="player.raw.isReinforcement"
                                                    color="rgb(var(--v-theme-success))" class="ml-6" />
                                            </div>
                                            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                                                <div class="text-truncate">
                                                    <v-icon flat @click="editPlayer(player.raw.id)">
                                                        {{ icons.editIcon }}
                                                    </v-icon>
                                                    <v-icon flat>
                                                        {{ icons.inactiveIcon }}
                                                    </v-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>

                    <template #footer="{ page, pageCount, prevPage, nextPage }">
                        <div class="d-flex align-center justify-center pa-4">
                            <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal"
                                rounded @click="prevPage" />

                            <div class="mx-2 text-caption">
                                Page {{ page }} of {{ pageCount }}
                            </div>

                            <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right"
                                variant="tonal" rounded @click="nextPage" />
                        </div>
                    </template>
                </v-data-iterator>
            </v-card>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { icons } from '@/utils/consts/icons';
import useManagerTeam from '@/pages/managers/team/composable/useManagerTeam';
import router from '@/router';

const { getTeam, team, getCategorytext, getChiptext, getPaidtext, getRoleText, getStatusChipColor } = useManagerTeam();
const search = ref('')

onMounted(async () => {
    await getTeam();
})

const editPlayer = (id: number) => {
    router.push(`/managers/rosters/${id}`)
}
</script>

<style scoped>
.cant-play {
    background-color: rgb(var(--v-theme-error));
    color: white
}

.cant-play .v-icon {
    background-color: rgb(var(--v-theme-error));
    color: white
}
</style>