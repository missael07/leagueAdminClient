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
                            text="Agregar Jugador/a" to="/managers/rosters/createrosterplayer">
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
                    <v-data-table :headers="playersHeaders" :items="team.rosters" height="350">
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
                                    <v-avatar :image="item.imgUrl" size="125" style="cursor: pointer;"
                                        @click="openDialog(item.id.toString())" />
                                    <v-dialog v-model="dialogs[item.id]" width="auto">
                                        <div class="ma-4">
                                            <v-img :width="300" aspect-ratio="16/9" class="bg-white" :src="item.imgUrl"
                                                cover />
                                        </div>
                                    </v-dialog>
                                </td>
                                <td align="center">
                                    {{ item.name }}
                                </td>
                                <td align="center">
                                    <v-badge v-if="item.blockedToPlay" color="rgb(var(--v-theme-error))" />
                                    <v-badge v-if="item.blockedToPitch" color="rgb(var(--v-theme-warning))" />
                                    <v-badge v-if="item.isReinforcement" color="rgb(var(--v-theme-success))"
                                        class="ml-6" />
                                </td>
                                <td align="center">
                                    <v-icon flat @click="editPlayer(item.id)">
                                        {{ icons.editIcon }}
                                    </v-icon>
                                    <v-icon flat @click="deletePlayer(item.id)">
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
import { onMounted, reactive } from 'vue';
import { icons } from '@/utils/consts/icons';
import useManagerTeam from '@/pages/managers/team/composable/useManagerTeam';
import router from '@/router';
import useEditRoster from '@/pages/managers/rosters/composables/useEditRoster';
import { succesModal } from '@/services/sweetAlert.service';

const { getTeam, team, getCategorytext, getChiptext, getPaidtext, getRoleText, getStatusChipColor, playersHeaders } = useManagerTeam();
const { deleteRoster } = useEditRoster();
onMounted(async () => {
    await getData();
})

const getData = async () => {
    await getTeam();
}
const dialogs: Record<string, boolean> = reactive({});

const openDialog = (id: string) => dialogs[id] = true;;

const editPlayer = (id: number) => {
    router.push(`/managers/rosters/${id}`)
}

const deletePlayer = async (id: number) => {
    const response = await deleteRoster(id);
    if (response) {
        succesModal(response.message);
        await getData();
    }
}
</script>

<style scoped></style>