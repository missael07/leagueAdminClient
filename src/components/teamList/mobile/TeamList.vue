<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <v-data-iterator :items="teams" :items-per-page="2" :search="search">
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
                            <v-col v-for="team in items" :key="team.raw.id" cols="auto" md="4">
                                <v-card class="pb-3" border flat>
                                    <v-list-item class="mb-2">
                                        <template #title>
                                            <strong class="text-h6 mb-2">{{ team.raw.name }}</strong>
                                        </template>
                                        <template #subtitle>
                                            <v-row>
                                                <v-col cols="12">
                                                    <small><strong class="text-h6">{{ team.raw.branchName }}</strong></small>
                                                </v-col>
                                                <v-col>
                                                    <small><strong class="text-h6">{{ getCategorytext(team.raw.category) }}</strong></small>
                                                </v-col>
                                            </v-row>                                            
                                        </template>
                                    </v-list-item>

                                    <div class="d-flex justify-end px-2">
                                        <div class="d-flex ml-5">
                                            <v-btn density="comfortable" text="View Units" variant="text"
                                                @click="openDialog(team.raw.id.toString())">
                                                Ver Jugadoras
                                            </v-btn>
                                            <v-dialog v-model="dialogs[team.raw.id]" width="auto">
                                                <RosterList v-if="!$vuetify.display.mobile" :team-id="team.raw.id" />
                                                <RosterListMobile v-else :team-id="team.raw.id" />
                                            </v-dialog>
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
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import useTeam from '@/pages/admin/team/composables/useTeam';
import RosterList from '@/components/Managers/rosters/web/RosterList.vue';
import RosterListMobile from '@/components/Managers/rosters/mobile/RosterList.vue';

const { getTeams, teams, filterValues, getCategorytext } = useTeam();
const search = ref('');

onMounted(async () => {
    await filter();
});

watch(filterValues, async () => {
    await filter();
}, { deep: true });

const filter = async () => {
    await getTeams();
};

const dialogs: Record<string, boolean> = reactive({});

const openDialog = (id: string) => {
    dialogs[id] = true;
};

</script>

<style scoped></style>