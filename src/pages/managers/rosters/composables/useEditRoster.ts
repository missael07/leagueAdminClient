import { ref } from "vue"
import axios from "axios";
import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import useLoader from "@/composables/useLoader";
import type { RosterResponse } from "../interfaces/rosterResponse";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useEditRoster = () => {

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

    const { displayErrors } = useHandleError();
    const { displayLoader } = useLoader();

    const editRoster = async () => {
        displayLoader.value = true;
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        try {
            const data = {
                firstName: roster.value.firstName,
                lastName: roster.value.lastName,
                blockedToPitch: roster.value.blockedToPitch,
                blockedToPlay: roster.value.blockedToPlay,
                isReinforcement: roster.value.isReinforcement,
            }
            const response = await axios.patch<Response<RosterResponse>>(`${BASE_URL}/rosters/${roster.value.id}`, data, {
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

    const deleteRoster = async (rosterId: number) => {
        displayLoader.value = true;
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        try {
            const response = await axios.delete<Response<RosterResponse>>(`${BASE_URL}/rosters/${rosterId}`, {
                headers: {
                    Authorization,
                },
            });
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
        editRoster,
        roster,
        deleteRoster
    }
}

export default useEditRoster;