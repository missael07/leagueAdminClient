<template>
    <v-container grid-list-xs>
        <v-card outlined class="pa-3">
            <v-data-iterator :items="players" :items-per-page="3" :search="search">
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
                                <v-card v-for="file in items" :key="file.raw.id" class="mb-2">
                                    <v-list-item>
                                        <template #prepend>
                                            <v-avatar :image="file.raw.imgUrl" size="75" style="cursor: pointer;"
                                                @click="openDialog(file.raw.id.toString())" />
                                            <v-dialog v-model="dialogs[file.raw.id]" width="auto">
                                                <div class="ma-4">
                                                    <v-img :width="300" aspect-ratio="16/9" class="bg-white"
                                                        :src="file.raw.imgUrl" cover />
                                                </div>
                                            </v-dialog>
                                        </template>
    
                                        <template #title>
                                            <strong class="text-h6 mb-2">{{ file.raw.name }}</strong>
                                        </template>
    
                                        <template #append>
                                            <div class="d-flex ml-5">
                                                <v-badge v-if="file.raw.blockedToPlay"
                                                    color="rgb(var(--v-theme-error))" />
                                                <v-badge v-if="file.raw.blockedToPitch"
                                                    color="rgb(var(--v-theme-warning))" />
                                                <v-badge v-if="file.raw.isReinforcement"
                                                    color="rgb(var(--v-theme-success))" class="ml-6" />
                                            </div>
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
import { onMounted, reactive, ref } from 'vue';
import useManagerRoster from '@/pages/managers/rosters/composables/useRoster';

interface Props {
    teamId: number;
}

const props = defineProps<Props>();
const search = ref('')
const { players, getRosters } = useManagerRoster();
const dialogs: Record<string, boolean> = reactive({});

onMounted(async () => await getRosters(props.teamId));

const openDialog = (id: string) => dialogs[id] = true;;

</script>

<style scoped></style>