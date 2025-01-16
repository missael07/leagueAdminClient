<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Cedulas</h1>
                <v-row dense class="mb-2 mr-5">
                    <v-col>
                        <v-text-field v-model="filterValues.term" placeholder="Buscar..."
                            prepend-inner-icon="mdi-magnify" style="max-width: 300px;" clearable hide-details
                            @input="filter" @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.category" item-title="title" item-value="value"
                            :label="Labels.categoriesLabels.categoryText" :items="categoriesFilter" required
                            item-color="white" class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.branch" item-title="title" item-value="value"
                            :label="Labels.branchLabels.branchText" :items="branchesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.isActive" item-title="title" item-value="value"
                            :label="Labels.statusLabels.statusText" :items="statusTypes" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                </v-row>
            </template>
            <v-data-table :headers="teamsHeader" :items="teams">
                <template #item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>{{ getCategorytext(item.category) }}</td>
                        <td>{{ item.branchName }}</td>
                        <td>
                            <v-btn density="comfortable" text="View Units" variant="text" @click="openDialog(item.id.toString())">
                                Ver Jugadoras
                            </v-btn>
                            <v-dialog v-model="dialogs[item.id]" width="auto">
                                <RosterList v-if="!$vuetify.display.mobile" :team-id="item.id" />
                                <RosterListMobile v-else :team-id="item.id" />
                            </v-dialog>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import useTeam from '@/pages/admin/team/composables/useTeam';
import RosterList from '@/components/Managers/rosters/web/RosterList.vue';
import RosterListMobile from '@/components/Managers/rosters/mobile/RosterList.vue';
import { Labels } from '@/utils/consts/string';
import { branchesFilter } from '@/utils/consts/branchs';
import { statusTypes } from '@/utils/consts/statuses';
import { categoriesFilter } from '@/utils/consts/categories';

const { getTeams, teams, filterValues, getCategorytext } = useTeam();

const teamsHeader = [
    { key: 'name', title: 'Equipo', },
    { key: 'categoryName', title: 'Categoria', },
    { key: 'branchName', title: 'Rama', },
    { key: '', title: '', },
  ]
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
