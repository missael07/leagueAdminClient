<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="12" md="10" sm="6">
                        <v-btn class="font-weight-regular mt-2 add" color="primary" prepend-icon="mdi-plus"
                            text="Agregar Equipo" to="/admin/team/createTeam">
                            <template #prepend>
                                <v-icon class="btn-icon" />
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense class="mr-5">
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
                    <v-col cols="6">
                        <v-select v-model="filterValues.isPaid" item-title="title" item-value="value"
                            :label="Labels.paidLabels.isPaidText" :items="paidOptions" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="filterValues.isActive" item-title="title" item-value="value"
                            :label="Labels.statusLabels.statusText" :items="statusTypes" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                </v-row>
            </template>
            <v-card class="mt-5">
                <v-data-iterator :items="teams" :items-per-page="3" :search="search">
                    <template #header>
                        <v-toolbar class="px-2">
                            <v-text-field v-model="search" density="comfortable" placeholder="Search"
                                prepend-inner-icon="mdi-magnify" style="max-width: 300px;" variant="solo" clearable
                                hide-details />
                        </v-toolbar>
                    </template>
                    <template #no-data>
                    <div>
                        No hay información disponible por el momento.
                    </div>
                </template>

                    <template #default="{ items }">
                        <v-container class="pa-2" fluid>
                            <v-list lines="two">
                                <v-card v-for="item in items" :key="item.raw.id" class="mb-2">
                                    <v-list-item>
                                        <template #title>
                                            <div class="d-flex justify-space-between mb-2"
                                                @click="editTeam(item.raw.id, item.raw.isActive)">
                                                <div>
                                                    <h4>{{ item.raw.name }}</h4>
                                                </div>
                                                <v-chip :color="getStatusChipColor(item.raw.isActive)" class="mr-1">
                                                    {{ getChiptext(item.raw.isActive) }}
                                                </v-chip>
                                            </div>
                                        </template>
                                        <template #subtitle>
                                            <div class="d-flex justify-space-between mb-5"
                                                @click="editTeam(item.raw.id, item.raw.isActive)">
                                                <div>
                                                    {{ getCategorytext(item.raw.category) }}
                                                </div>
                                                <div>
                                                    {{ item.raw.branchName }}
                                                </div>
                                                <div>
                                                    <v-chip :color="getStatusChipColor(item.raw.isPaid)" class="mr-1">
                                                        {{ getPaidtext(item.raw.isPaid) }}
                                                    </v-chip>
                                                </div>
                                            </div>
                                        </template>
                                        <template #append>
                                            <v-icon v-if="item.raw.isActive" flat @click="changeStatus(item.raw.id)">
                                                {{ icons.inactiveIcon }}
                                            </v-icon>
                                            <v-icon v-else flat @click="changeStatus(item.raw.id)">
                                                {{ icons.activeIcon }}
                                            </v-icon>
                                            <v-icon v-if="!item.raw.isPaid" flat @click="payMethod(item.raw.id)">
                                                {{ icons.currencyIcon }}
                                            </v-icon>
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
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { icons } from '@/utils/consts/icons';
import { categoriesFilter } from '@/utils/consts/categories';
import { Labels } from '@/utils/consts/string';
import { branchesFilter } from '@/utils/consts/branchs';
import { paidOptions } from '@/utils/consts/paid';
import { statusTypes } from '@/utils/consts/statuses';
import { useRouter } from 'vue-router';
import useTeam from '@/pages/admin/team/composables/useTeam';
import { changeStatus, payMethod } from '../script/teams'

const { getTeams, teams, filterValues, getCategorytext, getChiptext, getPaidtext,
    getStatusChipColor
} = useTeam();
const router = useRouter();

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


const editTeam = (teamId: number, status: boolean) => {
    if (status) {
        router.push(`/admin/team/${teamId} `);
    }
}


</script>
