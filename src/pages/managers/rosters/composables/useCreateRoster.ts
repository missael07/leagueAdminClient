import { ref } from "vue"
import axios from "axios";
import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import useLoader from "@/composables/useLoader";
import { getTeamId } from "@/auth/validateAuth.service";
import type { RosterResponse } from "../interfaces/rosterResponse";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useCreateRoster = () => {

    const roster = ref<RosterResponse>({
        id: 0,
        name: '',
        firstName: '',
        lastName: '',
        imgUrl: '',
        blockedToPitch: false,
        blockedToPlay: false,
        isReinforcement: false,
    });
    const term = ref("");
    const { displayErrors } = useHandleError();
    const { displayLoader } = useLoader();


    const uploadImg = async (file: File) =>{
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        if(!file) {
            return undefined;
        }
        const formData = new FormData();
        
        // Agregar el archivo
        formData.append('file', file);

        try {
            const url = `${BASE_URL}/file-upload/s3`;
            const result = await axios.post(url, formData, {
                headers: {
                    Authorization,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return result.data.item;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                displayErrors(error);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const createRoster = async () => {
        displayLoader.value = true;
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        try {
            const data = {
                firstName: roster.value.firstName,
                lastName: roster.value.lastName,
                imgUrl: roster.value.imgUrl,
                teamId: getTeamId()
            }
            const response = await axios.post<Response<RosterResponse>>(`${BASE_URL}/rosters`, data, {
                headers: {
                    Authorization,
                },
            });
            roster.value = response.data.item;
            displayLoader.value = false;
            return response.data
        } catch (error) {
            displayLoader.value = false;
            if (axios.isAxiosError(error)) {
                displayErrors(error);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return {
        createRoster,
        roster,
        term,
        uploadImg
    }
}

export default useCreateRoster;