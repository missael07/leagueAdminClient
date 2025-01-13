<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Agregar Usuario</h1>
            </template>
            <v-card-text>     
                <v-form>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="user.firstName" :label="Labels.userLabels.nameText" :error-messages="getErrors(errors, 'firstName')" />
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="user.lastName" :label="Labels.userLabels.lastNameText" :error-messages="getErrors(errors, 'lastName')" />
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="user.email" :label="Labels.userLabels.emailText" :error-messages="getErrors(errors, 'email')" />
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="user.phoneNumber" :label="Labels.userLabels.phoneNumText" :error-messages="getErrors(errors, 'phoneNumber')" />
                        </v-col>
                        <v-col cols="4">
                            <v-select v-model="teamId" item-title="title" item-value="value" :label="Labels.userLabels.teamText"
                                :items="teams" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'teamId')" variant="solo" />
                        </v-col>
                        <v-col cols="4">
                            <v-select v-model="user.role" item-title="title" item-value="value" :label="Labels.userLabels.roleText"
                                :items="roles" required item-color="white" class="user-companies"
                                :error-messages="getErrors(errors, 'roleId')" variant="solo" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end mr-4">
                <v-btn text="Cancelar" variant="plain" to="/admin/users/usersList" />
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Labels } from '@/utils/consts/string';
import useCreateUser from './composables/useCreateUser';
import { roles } from '@/utils/consts/roles';
import useTeam from '../team/composables/useTeam';
import type { ComboBoxItem } from '@/interfaces/comboBox.interface';

const { createUser, user } = useCreateUser();
const { getErrors, errors, resetErrors } = useHandleError();
const { getTeamsForSelect } = useTeam();
const router = useRouter();

const teamId = ref(0);
const teams = ref<ComboBoxItem[]>([]);
onMounted(async () => {
    resetErrors();
    teams.value = await getTeamsForSelect();
    teams.value.unshift({ title: Labels.userLabels.selectTeamText, value: 0 });
});

const save = async () => {
    resetErrors();
    const response = await createUser(teamId.value);
    if (response) {
        succesModal(response.message);
        router.push(`/admin/users/${response.item.id}`);
    }
}

</script>

<style scoped></style>