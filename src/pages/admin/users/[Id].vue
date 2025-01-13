<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Editar Usuario</h1>
            </template>
            <v-card-text>     
                <v-form>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field v-model="user.userName" :label="Labels.userLabels.userNameText" readonly disabled />
                        </v-col>
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
import { useRoute } from 'vue-router';
import { Labels } from '@/utils/consts/string';
import { roles } from '@/utils/consts/roles';
import useTeam from '../team/composables/useTeam';
import type { ComboBoxItem } from '@/interfaces/comboBox.interface';
import useUser from './composables/useUsers';
import useEditUser from './composables/useEditUser';

const { editUser, user } = useEditUser();
const { getUser } = useUser();
const { getErrors, errors, resetErrors } = useHandleError();
const { getTeamsForSelect } = useTeam();
const route = useRoute();

const teamId = ref(0);
const teams = ref<ComboBoxItem[]>([]);
onMounted(async () => {
    await getData();
});

const getData = async () => {
    resetErrors();
    teams.value = await getTeamsForSelect();
    teams.value.unshift({ title: Labels.userLabels.selectTeamText, value: 0 });
    const userId = route.params.Id;
    const response = await getUser(+userId);
    if (response) {
        user.value.firstName = response.firstName;
        user.value.lastName = response.lastName;
        user.value.email = response.email;
        user.value.phoneNumber = response.phoneNumber;
        teamId.value = response.teamIds[0];
        user.value.role = response.role;
        user.value.userName = response.userName;
        user.value.id = response.id;
    }
}  

const save = async () => {
    resetErrors();
    const response = await editUser();
    if (response) {
        succesModal(response.message);
    }
}

</script>

<style scoped></style>