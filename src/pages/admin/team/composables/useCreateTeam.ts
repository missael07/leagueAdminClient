import { ref } from "vue"
import axios from "axios";
import type { TeamResponse } from "../interface/teamResponse.interface";
import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import { Branch } from "@/enums/globaEnums";
import useLoader from "@/composables/useLoader";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useCreateTeam = () => {

    const team = ref<TeamResponse>({
        name: "",
        category: 0,
        branch: Branch.selectBranch,
        isPaid: false,
        isActive: true,
        branchName: "",
        categoryName: "",
        id: 0,
    });
    const term = ref("");
    const { displayErrors } = useHandleError();
    const { displayLoader } = useLoader();

    const createTeam = async () => {
        displayLoader.value = true;
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        try {
            const data = {
                name: team.value.name,
                category: team.value.category,
                branch: team.value.branch,
                isPaid: team.value.isPaid,
            }
            const response = await axios.post<Response<TeamResponse>>(`${BASE_URL}/teams`, data, {
                headers: {
                    Authorization,
                },
            });
            team.value = response.data.item;
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
        createTeam,
        team,
        term
    }
}

export default useCreateTeam;