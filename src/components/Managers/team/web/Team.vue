<template>
    <v-container v-if="!$vuetify.display.mobile" grid-list-xs>
        <v-card>
            <template #title>
                <v-container grid-list-xs>
                    <v-row class="d-flex justify-space-between">
                        <div>
                            <h1>{{ team.name }}</h1>
                            <small class="text--secondary">{{ team.branch }}</small>
                            <small class="text--secondary ml-4">{{ getCategorytext(team.category) }}</small>
                        </div>

                        <div class="d-flex justify-space-between">
                            <v-chip :color="getStatusChipColor(team?.isActive)" class="mr-5">
                                {{ getChiptext(team?.isActive) }}
                            </v-chip>
                            <v-chip :color="getStatusChipColor(team?.isPaid)">
                                {{ getPaidtext(team?.isPaid) }}
                            </v-chip>
                        </div>
                    </v-row>
                </v-container>
            </template>
            <template #text>
                <div v-for="item in team?.managers" :key="item.email">
                    <v-row>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 6">
                            <v-row>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 3">
                                    {{ item.name }}
                                </v-col>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 4">
                                    {{ item.email }}
                                </v-col>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 2">
                                    {{ item.phoneNumber }}
                                </v-col>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 2">
                                    {{ getRoleText(item.role) }}
                                </v-col>
                                <v-divider v-if="$vuetify.display.mdAndDown" />
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
                <v-divider class="border-opacity-100  mt-2" color="primary" />
                <v-row dense class="mb-2 mr-5">
                    <v-col cols="12" md="10" sm="6">
                        <v-btn class="font-weight-regular mt-2 add" color="primary" prepend-icon="mdi-plus"
                            text="Agregar Jugador/a" to="/admin/team/createTeam">
                            <template #prepend>
                                <v-icon class="btn-icon" />
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
                <div class="d-flex justify-space-around mt-5 mb-2">
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
                <v-card class=" pa-3 d-flex flex-column mt-6">
                    <v-data-table :headers="playersHeaders" :items="team.rosters">
                        <template #headers>
                            <tr>
                                <td align="center" style="border-bottom: 1px solid;">
                                    {{ '' }}
                                </td>
                                <td align="center" style="border-bottom: 1px solid;">
                                    Nombre
                                </td>
                                <td align="center" style="border-bottom: 1px solid;">
                                    Disponibilidad
                                </td>
                                <td align="center" style="border-bottom: 1px solid;">
                                    Acciones
                                </td>
                            </tr>
                        </template>
                        <template #item="{ item }">
                            <tr>
                                <td align="center">
                                    <v-avatar :image="item.imgUrl" size="76" />
                                </td>
                                <td align="center">
                                    {{ item.name }}
                                </td>
                                <td align="center" class="d-flex justify-center">
                                    <p class="px-4">
                                        <v-badge v-if="!item.canPlay" left color="rgb(var(--v-theme-error))" />
                                    </p>
                                    <p class="px-4">
                                        <v-badge v-if="!item.canPitch" left color="rgb(var(--v-theme-warning))" />
                                    </p>
                                    <p class="px-4">
                                        <v-badge v-if="item.isReinforcement" left color="rgb(var(--v-theme-success))" />
                                    </p>
                                </td>
                                <td align="center">
                                    <v-icon flat>
                                        {{ icons.editIcon }}
                                    </v-icon>
                                    <v-icon flat>
                                        {{ icons.inactiveIcon }}
                                    </v-icon>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </template>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Category, Role } from '@/enums/globaEnums';
import { Labels } from '@/utils/consts/string';
import { icons } from '@/utils/consts/icons';
import useManagerTeam from '@/pages/managers/team/composable/useManagerTeam';

const { getTeam, team, playersHeaders } = useManagerTeam();

onMounted(async () => {
    const response = await getTeam();
    if (response) {
        console.log(response.rosters)
    }
    console.log(team.value.rosters)
})


const getChiptext = (status: boolean | undefined) => {
    switch (status) {
        case true:
            return 'Activo'
        case false:
            return 'Inactivo'
    }
}

const getPaidtext = (status: boolean | undefined) => {
    switch (status) {
        case true:
            return 'Pagado'
        case false:
            return 'Pendiente'

    }
}

const getStatusChipColor = (status: boolean | undefined) => {
    switch (status) {
        case true:
            return '#4CAF50'
        case false:
            return '#F44336'
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