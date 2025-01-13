<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="12" md="10" sm="6">
                        <v-btn class="font-weight-regular mt-2 add" color="primary" prepend-icon="mdi-plus"
                            text="Agregar Equipo" to="/team/createTeam">
                            <template #prepend>
                                <v-icon class="btn-icon" />
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense class="mb-2 mr-5">
                    <v-col>
                        <v-text-field v-model="filterValues.term" placeholder="Buscar..."
                            prepend-inner-icon="mdi-magnify" style="max-width: 300px;" clearable hide-details
                            @input="filter" @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.category" item-title="title" item-value="value"
                            :label="Labels.categoriesLabels.categoryText" :items="categoriesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.branch" item-title="title" item-value="value"
                            :label="Labels.branchLabels.branchText" :items="branchesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.isPaid" item-title="title" item-value="value"
                            :label="Labels.paidLabels.isPaidText" :items="paidOptions" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.isActive" item-title="title" item-value="value" :label="Labels.statusLabels.statusText"
                            :items="statusTypes" required item-color="white" class="user-companies" clearable
                            hide-details @click:clear="filter" />
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
                            <v-chip :color="getStatusChipColor(item.isPaid)">
                                {{ getPaidtext(item.isPaid) }}
                            </v-chip>
                        </td>
                        <td>
                            <v-chip :color="getStatusChipColor(item.isActive)">
                                {{ getChiptext(item.isActive) }}
                            </v-chip>
                        </td>
                        <td>
                            <v-icon v-if="item.isActive" flat @click="editTeam(item.id)">
                                {{ icons.editIcon }}
                            </v-icon>
                            <v-icon v-if="item.isActive" flat @click="changeStatus(item.id)">
                                {{ icons.inactiveIcon }}
                            </v-icon>
                            <v-icon v-else flat @click="changeStatus(item.id)">
                                {{ icons.activeIcon }}
                            </v-icon>
                            <v-icon v-if="!item.isPaid" flat @click="payMethod(item.id)">
                                {{ icons.currencyIcon }}
                            </v-icon>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useTeam from './composables/useTeam';
import { icons } from '@/utils/consts/icons';
import { categoriesFilter } from '@/utils/consts/categories';
import { Labels } from '@/utils/consts/string';
import { branchesFilter } from '@/utils/consts/branchs';
import { paidOptions } from '@/utils/consts/paid';
import { statusTypes } from '@/utils/consts/statuses';
import { useRouter } from 'vue-router';
import useEditTeam from './composables/useEditTeam';
import { succesModal } from '@/services/sweetAlert.service';
import { Category } from '@/enums/globaEnums';


const { getTeams, teams, teamsHeader, filterValues } = useTeam();
const { changeTeamStatus, pay } = useEditTeam();
const router = useRouter();


onMounted(async () => {
    await filter();
});

watch(filterValues, async () => {
    await filter();
}, { deep: true });

const filter = async () => {
    await getTeams();
};

const getChiptext = (status: boolean) => {
    switch (status) {
        case true:
            return 'Activo'
        case false:
            return 'Inactivo'

    }
}

const getPaidtext = (status: boolean) => {
    switch (status) {
        case true:
            return 'Pagado'
        case false:
            return 'Pendiente'

    }
}

const getCategorytext = (category: Category) => {
    switch (category) {
        case Category.r:
            return Labels.categoriesLabels.rCategoryText;
        case Category.e:
            return Labels.categoriesLabels.eCategoryText;
        case Category.d:
            return Labels.categoriesLabels.dCategoryText;
        case Category.c:
            return Labels.categoriesLabels.cCategoryText;
        case Category.b:
            return Labels.categoriesLabels.bCategoryText;
        case Category.a:
            return Labels.categoriesLabels.aCategoryText;

    }
}

const getStatusChipColor = (status: boolean) => {
    switch (status) {
        case true:
            return '#4CAF50'
        case false:
            return '#F44336'
    }
}

const editTeam = (teamId: number) => {
    router.push(`/team/${teamId} `);
}

const changeStatus = async (teamId: number) => {
    const response = await changeTeamStatus(teamId);
    if (response) {
        succesModal(response.message);
        await filter();

    }
}

const payMethod = async (teamId: number) => {
    const response = await pay(teamId);
    if (response) {
        succesModal(response.message);
        await filter();

    }
}

</script>
