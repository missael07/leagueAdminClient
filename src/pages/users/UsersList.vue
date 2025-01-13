<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="12" md="10" sm="6">
                        <v-btn class="font-weight-regular mt-2 add" color="primary" prepend-icon="mdi-plus"
                            text="Agregar Equipo" to="/users/createUser">
                            <template #prepend>
                                <v-icon class="btn-icon" color="surface" />
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense class="mb-2 mr-5">
                    <v-col>
                        <v-text-field v-model="filterValues.term" placeholder="Search By Team"
                            prepend-inner-icon="mdi-magnify"  clearable persistent-hint
                            @input="filter" @click:clear="filter" hint="Puedes buscar por nombre o e-mail"/>
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.team" item-title="title" item-value="value"
                            :label="Labels.categoriesLabels.categoryText" :items="categoriesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.role" item-title="title" item-value="value"
                            :label="Labels.roleLabels.roleText" :items="branchesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col>
                        <v-select v-model="filterValues.isActive" item-title="title" item-value="value" label="Estatus"
                            :items="statusTypes" required item-color="white" class="user-companies" clearable
                            hide-details @click:clear="filter" />
                    </v-col>
                </v-row>
            </template>
            <v-data-table :headers="usersHeader" :items="users">
                <template #item="{ item }">
                    <tr>
                        <td>{{ item.userName }}</td>
                        <td>{{ item.fullName }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            {{ item.roleName }}
                        </td>
                        <td>
                            {{ item.team }}
                        </td>
                        <td>
                            <v-chip :color="getStatusChipColor(item.isActive)">
                                {{ getChiptext(item.isActive) }}
                            </v-chip>
                        </td>
                        <td>
                            <v-icon v-if="item.isActive" flat @click="editUser(item.id)">
                                {{ icons.editIcon }}
                            </v-icon>
                            <v-icon v-if="item.isActive" flat @click="changeStatus(item.id)">
                                {{ icons.inactiveIcon }}
                            </v-icon>
                            <v-icon v-else flat @click="changeStatus(item.id)">
                                {{ icons.activeIcon }}
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
import { icons } from '@/utils/consts/icons';
import { categoriesFilter } from '@/utils/consts/categories';
import { Labels } from '@/utils/consts/string';
import { branchesFilter } from '@/utils/consts/branchs';
import { statusTypes } from '@/utils/consts/statuses';
import { useRouter } from 'vue-router';
import { Category } from '@/enums/globaEnums';
import useUser from './composables/useUsers';


const { getUsers, users, usersHeader, filterValues } = useUser();
const router = useRouter();


onMounted(async () => {
    await filter();
});

watch(filterValues, async () => {
    await filter();
}, { deep: true });

const filter = async () => {
    await getUsers();
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

const editUser = (userId: number) => {
    console.log(userId);
    router.push(`/users/${userId} `);
}

const changeStatus = async (teamId: number) => {
    // const response = await changeUserstatus(teamId);
    // if (response) {
    //     succesModal(response.message);
    //     await filter();

    // }
}

const payMethod = async (teamId: number) => {
    // const response = await pay(teamId);
    // if (response) {
    //     succesModal(response.message);
    //     await filter();

    // }
}

</script>
