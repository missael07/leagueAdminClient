<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Editar Equipo</h1>
            </template>
            <v-card-text>     
                <v-form>
                    <v-row>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 3">
                            <v-text-field v-model="team.name" :label="Labels.teamLabels.nameText" :error-messages="getErrors(errors, 'name')" />
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 3">
                            <v-select v-model="team.category" item-title="title" item-value="value" :label="Labels.categoriesLabels.categoryText"
                                :items="categories" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'category')" variant="solo" />
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 2">
                            <v-select v-model="team.branch" item-title="title" item-value="value" :label="Labels.branchLabels.branchText"
                                :items="branches" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'branch')" variant="solo" />
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 2">
                            <v-select v-model="team.isPaid" item-title="title" item-value="value" :label="Labels.paidLabels.isPaidText"
                                :items="paidOptions" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'isPaid')" variant="solo" />
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 2">
                            <v-select v-model="team.isActive" item-title="title" item-value="value" :label="Labels.statusLabels.statusText"
                                :items="statusTypes" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'isPaid')" variant="solo" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end mr-4">
                <v-btn text="Cancelar" variant="plain" to="/admin/team/teamList" />
                <v-btn class="text-none font-weight-regular bg-primary" :prepend-icon="icons.saveIcon" text="Guardar"
                    color="surface" @click="save">
                    <template #prepend>
                        <v-icon color="surface" />
                    </template>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import useHandleError from '@/composables/useHandleErrors';
import { succesModal } from '@/services/sweetAlert.service';
import { icons } from '@/utils/consts/icons';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { branches } from '@/utils/consts/branchs';
import { Labels } from '@/utils/consts/string';
import { categories } from '@/utils/consts/categories';
import { paidOptions } from '@/utils/consts/paid';
import useTeam  from './composables/useTeam';
import useEditTeam from './composables/useEditTeam';
import { statusTypes } from '@/utils/consts/statuses';

const { editTeam, team } = useEditTeam();
const { getTeam } = useTeam();
const { getErrors, errors, resetErrors } = useHandleError();
const route = useRoute();

onMounted(async () => {
    resetErrors();
    const id = +route.params.Id;
    const response = await getTeam(id);
    if(response){
        team.value.name = response.name;
        team.value.category = response.category;
        team.value.branch = response.branch;
        team.value.isPaid = response.isPaid;
        team.value.id = response.id;
    }
});

const save = async () => {
    resetErrors();
    const response = await editTeam();
    if (response) {
        succesModal(response.message);
    }
}

</script>

<style scoped></style>