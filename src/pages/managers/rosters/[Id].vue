<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Editar Jugador/a</h1>
            </template>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 6" align="center">
                            <v-file-input v-show="false" id="fileInput" v-model="file" label="Parking Lot Image" chips
                                accept="image/*" show-size class="mt-2" @input.stop="changeImage" />
                            <v-avatar v-if="roster.imgUrl" size="200" @click="clickFileInput">
                                <v-img :src="roster.imgUrl" class="mt-2" />
                            </v-avatar>
                            <v-avatar v-else size="200" @click="clickFileInput">
                                <v-img src="../../../assets/No-img.jpg" alt="Sin Imagen" class="mt-2" />
                            </v-avatar>
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 6">
                            <v-row>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 6">
                                    <v-text-field v-model="roster.firstName" :label="Labels.rosterLabels.nameText"
                                        :error-messages="getErrors(errors, 'firstName')" />
                                </v-col>
                                <v-col :cols="$vuetify.display.mdAndDown ? 6 : 6">
                                    <v-text-field v-model="roster.lastName" :label="Labels.rosterLabels.lastNameText"
                                        :error-messages="getErrors(errors, 'lastName')" />
                                </v-col>
                                <!-- <v-col :cols="$vuetify.display.mobile ? 6 : 4" align="center">
                                    <v-checkbox v-model="roster.blockedToPlay" @update:model-value="blockAvailability">
                                        <template #label>
                                            No Puede Jugar
                                        </template>
                                    </v-checkbox>
                                </v-col>
                                <v-col :cols="$vuetify.display.mobile ? 6 : 4">
                                    <v-checkbox v-model="roster.blockedToPitch" :disabled="disabled">
                                        <template #label>
                                            No Puede Pitchar
                                        </template>
                                    </v-checkbox>
                                </v-col>
                                <v-col :cols="$vuetify.display.mobile ? 6 : 4">
                                    <v-checkbox v-model="roster.isReinforcement" :disabled="disabled">
                                        <template #label>
                                            Refuerzo
                                        </template>
                                    </v-checkbox>
                                </v-col> -->
                            </v-row>
                        </v-col>                        
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-end mr-4">
                <v-btn text="Cancelar" variant="plain" to="/managers/team/teampage" />
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
import { onMounted, ref } from 'vue';
import { icons } from '@/utils/consts/icons';
import { Labels } from '@/utils/consts/string';
import useHandleError from '@/composables/useHandleErrors';
import { succesModal } from '@/services/sweetAlert.service';
import useManagerRoster from './composables/useRoster';
import { useRoute } from 'vue-router';
import useEditRoster from './composables/useEditRoster';


const { roster, editRoster } = useEditRoster();
const { getRoster } = useManagerRoster();
const { getErrors, errors, resetErrors } = useHandleError();
const file = ref();
const route = useRoute();
const disabled = ref(false);


onMounted(async () => {
    resetErrors();
    const id = route.params.Id
    const response = await getRoster(+id)
    if (response) {
        roster.value.imgUrl = response.imgUrl;
        roster.value.firstName = response.firstName;
        roster.value.lastName = response.lastName;
        roster.value.blockedToPitch = response.blockedToPitch;
        roster.value.blockedToPlay = response.blockedToPlay;
        roster.value.isReinforcement = response.isReinforcement;
        roster.value.id = response.id;
        disabled.value = response.blockedToPlay;
    }
});

const clickFileInput = () => {
    const element = document.getElementById('fileInput');
    element?.click();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = (e: any) => {
            roster.value.imgUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// const blockAvailability = () => {
//     disabled.value = !disabled.value;
//     roster.value.blockedToPitch = false;
//     roster.value.isReinforcement = false;
// }

const save = async () => {

    const response = await editRoster()
    if (response) {
        succesModal(response.message);
    }
}
</script>

<style scoped></style>