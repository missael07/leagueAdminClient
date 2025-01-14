<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <v-data-table :headers="playersHeaders" :items="players" height="450" :items-per-page-options="[3]" items-per-page="3">
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
                    </tr>
                </template>
                <template #item="{ item }">
                    <tr>
                        <td align="center">
                            <v-avatar :image="item.imgUrl" size="125" style="cursor: pointer;" @click="openDialog(item.id.toString())" />
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
                            <v-badge v-if="item.isReinforcement" color="rgb(var(--v-theme-success))" class="ml-6" />
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import useManagerRoster from '@/pages/managers/rosters/composables/useRoster';
import { onMounted, reactive, defineProps } from 'vue';

interface Props {
    teamId: number;
}

const { playersHeaders, players, getRosters } = useManagerRoster();
const dialogs: Record<string, boolean> = reactive({});
const props = defineProps<Props>();

onMounted(async () => await getRosters(props.teamId))

const openDialog = (id: string) => dialogs[id] = true;;
</script>

<style scoped></style>