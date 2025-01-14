<template>
    <v-container grid-list-xs>
        <v-card rounded="lg">
            <template #title>
                <h1>Agregar Jugador/a</h1>
            </template>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 3" align="center">
                            <v-file-input v-show="false" id="fileInput" v-model="file" label="Parking Lot Image" chips
                                accept="image/*" show-size class="mt-2" @input.stop="changeImage" />
                            <v-avatar v-if="roster.imgUrl" size="200" @click="clickFileInput">
                                <v-img :src="roster.imgUrl" class="mt-2" />
                            </v-avatar>
                            <v-avatar v-else size="200" @click="clickFileInput">
                                <v-img src="../../../assets/No-img.jpg" alt="Sin Imagen" class="mt-2" />
                            </v-avatar>
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 3">
                            <v-text-field v-model="roster.firstName" :label="Labels.rosterLabels.nameText"
                                :error-messages="getErrors(errors, 'firstName')" />
                        </v-col>
                        <v-col :cols="$vuetify.display.mdAndDown ? 12 : 3">
                            <v-text-field v-model="roster.lastName" :label="Labels.rosterLabels.lastNameText"
                                :error-messages="getErrors(errors, 'lastName')" />
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
import useCreateRoster from './composables/useCreateRoster';
import { Labels } from '@/utils/consts/string';
import useHandleError from '@/composables/useHandleErrors';
import { succesModal } from '@/services/sweetAlert.service';
import useLoader from '@/composables/useLoader';
import { useRouter } from 'vue-router';


const { roster, createRoster, uploadImg } = useCreateRoster();
const { getErrors, errors, resetErrors } = useHandleError();
const { displayLoader } = useLoader();
const file = ref();
const router = useRouter();

onMounted(async () => {
    resetErrors();
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


const save = async () => {
    displayLoader.value = true;
    if (file.value) {
        const response = await uploadImg(file.value)
        if (response) {
            roster.value.imgUrl = response.fileKey;
        }
    }

    const response = await createRoster()
    if (response) {
        succesModal(response.message);
        router.push(`/managers/rosters/${response.item.id}`)
    }
}
</script>

<style scoped></style>