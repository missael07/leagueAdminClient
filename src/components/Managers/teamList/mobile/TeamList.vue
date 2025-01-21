<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <template #title>
                <h1>Cedulas</h1>
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="6">
                        <v-select v-model="filterValues.category" item-title="title" item-value="value"
                            :label="Labels.categoriesLabels.categoryText" :items="categoriesFilter" required
                            item-color="white" class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="filterValues.branch" item-title="title" item-value="value"
                            :label="Labels.branchLabels.branchText" :items="branchesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                </v-row>
            </template>
            <v-data-iterator :items="teams" :items-per-page="5" :search="search">
                <template #header>
                    <v-toolbar class="px-2">
                        <v-text-field v-model="search" density="comfortable" placeholder="Search"
                            prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                            hide-details />
                    </v-toolbar>
                </template>

                <template #default="{ items }">
                    <v-container class="pa-2" fluid>
                        <v-list lines="two">
                            <v-card v-for="file in items" :key="file.raw.id" class="mb-2">
                                <v-list-item>
                                    <template #title>
                                        <strong class="text-h6 mb-2">{{ file.raw.name }}</strong>
                                    </template>
                                    <template #subtitle>
                                        <div>
                                            <small>
                                                <strong style="font-size: 14px;">
                                                    {{ file.raw.branchName }}
                                                </strong>
                                            </small>
                                        </div>
                                        <div>
                                            <small>
                                                <strong style="font-size: 14px;">
                                                    {{ getCategorytext(file.raw.category) }}
                                                </strong>
                                            </small>
                                        </div>
                                    </template>

                                    <template #append>
                                        <v-btn density="comfortable" text="View Units" variant="text"
                                            @click="openDialog(file.raw.id.toString())">
                                            Ver Jugadoras
                                        </v-btn>
                                        <v-dialog v-model="dialogs[file.raw.id]" width="auto">
                                            <RosterList v-if="!$vuetify.display.mobile" :team-id="file.raw.id" />
                                            <RosterListMobile v-else :team-id="file.raw.id" />
                                        </v-dialog>
                                    </template>
                                </v-list-item>
                            </v-card>
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
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import useTeam from '@/pages/admin/team/composables/useTeam';
import RosterList from '@/components/Managers/rosters/web/RosterList.vue';
import RosterListMobile from '@/components/Managers/rosters/mobile/RosterList.vue';
import { Labels } from '@/utils/consts/string';
import { categoriesFilter } from '@/utils/consts/categories';
import { branchesFilter } from '@/utils/consts/branchs';

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