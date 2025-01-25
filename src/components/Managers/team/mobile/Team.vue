<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-2">
            <!-- Header -->
            <v-card-title class="d-flex ">
                <div>
                    <h2 class="font-weight-bold">
                        {{ team?.name }}
                    </h2>
                    <v-chip :color="getStatusChipColor(team?.isActive)" class="mr-2" small>
                        {{ getChiptext(team?.isActive) }}
                    </v-chip>
                    <v-chip :color="getStatusChipColor(team?.isPaid)" small>
                        {{ getPaidtext(team?.isPaid) }}
                    </v-chip>
                    <div>
                        <small class="text--secondary">{{ team.branch }}</small>
                        <small class="text--secondary ml-4">{{ getCategorytext(team.category) }}</small>
                    </div>
                </div>
            </v-card-title>
            <v-row v-for="manager in team?.managers" :key="manager.email" dense>
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
            <div class="d-flex justify-space-around mt-5">
                <v-chip color="rgb(var(--v-theme-error))">
                    No puede Jugar
                </v-chip>
                <v-chip color="rgb(var(--v-theme-warning))">
                    No puede Pitchar
                </v-chip>
                <v-chip color="rgb(var(--v-theme-success))">
                    Refuerzo
                </v-chip>
            </div>
            <!-- Players Section -->
            <v-card class="mt-3">
                <v-data-iterator :items="team.rosters" :items-per-page="2" :search="search">
                    <template #header>
                        <v-toolbar class="px-2">
                            <v-row justify="center">
                                <v-text-field v-model="search" density="comfortable" placeholder="Search"
                                    prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                                    hide-details />
                                <v-btn color="primary" class="font-weight-bold mb-2 mt-2"
                                    to="/managers/team/createrosterplayer">
                                    <v-icon left color="primary">
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </v-toolbar>
                    </template>

                    <template #default="{ items }">
                        <v-container class="pa-2" fluid>
                            <v-list lines="two">
                                <v-list-item v-for="file in items" :key="file.raw.id">
                                    <template #prepend>
                                        <v-avatar :image="file.raw.imgUrl" size="75" style="cursor: pointer;"
                                            @click="openDialog(file.raw.id.toString())" />
                                        <v-dialog v-model="dialogs[file.raw.id]" width="auto">
                                            <div class="ma-4">
                                                <v-img :width="300" aspect-ratio="16/9" class="bg-white"
                                                    :src="file.raw.imgUrl" cover />
                                            </div>
                                        </v-dialog>
                                    </template>

                                    <template #title>
                                        <div class=" mb-2" @click="editPlayer(file.raw.id)">
                                            <h4>{{ file.raw.name }}</h4>
                                            <v-chip v-if="file.raw.blockedToPlay" color="rgb(var(--v-theme-error))"
                                                class="mr-2 ml-2" small />
                                            <v-chip v-if="file.raw.blockedToPitch" color="rgb(var(--v-theme-warning))"
                                                class="mr-2 ml-2" small />
                                            <v-chip v-if="file.raw.isReinforcement" color="rgb(var(--v-theme-success))"
                                                class="mr-2" small />
                                        </div>
                                    </template>

                                    <template #append>
                                        <v-icon flat>
                                            {{ icons.inactiveIcon }}
                                        </v-icon>
                                    </template>
                                </v-list-item>
                            </v-list>
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
import { onMounted, reactive, ref } from 'vue';
import { icons } from '@/utils/consts/icons';
import useManagerTeam from '@/pages/managers/team/composable/useManagerTeam';
import router from '@/router';
import { getTeamId } from '@/auth/validateAuth.service';

const { getTeam, team, getCategorytext, getChiptext, getPaidtext, getRoleText, getStatusChipColor } = useManagerTeam();
const search = ref('')
const dialogs: Record<string, boolean> = reactive({});

onMounted(async () => {
    await getTeam(getTeamId());
})

const openDialog = (id: string) => dialogs[id] = true;;

const editPlayer = (id: number) => {
    router.push(`/managers/team/${id}`)
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