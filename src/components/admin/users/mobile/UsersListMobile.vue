<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="12" md="10" sm="6">
                        <v-btn class="font-weight-regular mt-2 add" color="primary" prepend-icon="mdi-plus"
                            text="Agregar Usuario" to="/admin/users/createUser">
                            <template #prepend>
                                <v-icon class="btn-icon" />
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense class="mb-2 mr-5">                    
                    <v-col cols="12">
                        <v-select v-model="filterValues.team" item-title="title" item-value="value"
                            :label="Labels.categoriesLabels.categoryText" :items="categoriesFilter" required
                            item-color="white" class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="filterValues.role" item-title="title" item-value="value"
                            :label="Labels.roleLabels.roleText" :items="branchesFilter" required item-color="white"
                            class="user-companies" clearable hide-details @click:clear="filter" />
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="filterValues.isActive" item-title="title" item-value="value" label="Estatus"
                            :items="statusTypes" required item-color="white" class="user-companies" clearable
                            hide-details @click:clear="filter" />
                    </v-col>
                </v-row>
            </template>
            <v-card class="mt-5">
                <v-data-iterator :items="users" :items-per-page="5">
                    <template #header>
                        <v-toolbar class="px-2">
                            <v-text-field v-model="filterValues.term" density="comfortable" placeholder="Search"
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
                                                @click="editUser(item.raw.id, item.raw.isActive)">
                                                <div>
                                                    <h4>{{ item.raw.userName + '-'+ item.raw.fullName }}</h4>
                                                </div>
                                                <v-chip :color="getStatusChipColor(item.raw.isActive)" class="mr-1">
                                                    {{ getChiptext(item.raw.isActive) }}
                                                </v-chip>
                                            </div>
                                        </template>
                                        <template #subtitle>
                                            <div class="d-flex justify-space-between mb-5"
                                                @click="editUser(item.raw.id, item.raw.isActive)">
                                                <div>
                                                    {{ item.raw.email }}
                                                </div>
                                                <div>
                                                    {{ item.raw.team.join(',') }}
                                                </div>
                                                <div>
                                                    {{ getRoleText(item.raw.role) }}
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
import { onMounted, watch } from 'vue';
import { icons } from '@/utils/consts/icons';
import { categoriesFilter } from '@/utils/consts/categories';
import { Labels } from '@/utils/consts/string';
import { branchesFilter } from '@/utils/consts/branchs';
import { statusTypes } from '@/utils/consts/statuses';
import { useRouter } from 'vue-router';
import { succesModal } from '@/services/sweetAlert.service';
import { Role } from '@/enums/globaEnums';
import useUser from '@/pages/admin/users/composables/useUsers';
import useEditUser from '@/pages/admin/users/composables/useEditUser';


const { getUsers, users, filterValues } = useUser();
const { changeUserStatus } = useEditUser();
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

const getRoleText = (role: Role) => {
    switch (role) {
        case Role.admin:
            return Labels.roleLabels.adminRoleText
        case Role.manager:
            return Labels.roleLabels.managerRoleText
        case Role.coach:
            return Labels.roleLabels.coachRoleText

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

const editUser = (userId: number, status: boolean) => {
    if (status) {
        router.push(`/admin/users/${userId} `);
    }
}

const changeStatus = async (userId: number) => {
    const response = await changeUserStatus(userId);
    if (response) {
        succesModal(response.message);
        await filter();
    }
}




</script>
