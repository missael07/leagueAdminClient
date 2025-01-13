import { ref } from "vue"
import axios from "axios";

import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import { Branch, Role } from "@/enums/globaEnums";
import useLoader from "@/composables/useLoader";
import type { UserResponse } from "../interface/userResponse";
import { ro } from "vuetify/locale";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useCreateUser = () => {

    const user = ref<UserResponse>({
        id: 0,
        createdBy: "",
        email: "",
        firstName: "",
        fullName: "",
        isActive: true,
        lastName: "",
        phoneNumber: "",
        role: Role.selectRole,
        roleName: "",
        team: [],
        teamIds: [],
        userName: "",
    });
    const term = ref("");
    const { displayErrors } = useHandleError();
    const { displayLoader } = useLoader();

    const createUser = async (teamId: number) => {
        displayLoader.value = true;
        const token = localStorage.getItem("token");
        const Authorization = `Bearer ${token}`;
        try {
            const data = {
                firstName: user.value.firstName,
                lastName: user.value.lastName,
                phoneNumber: user.value.phoneNumber,
                email: user.value.email,
                roleId: user.value.role,
                teamId: teamId
            }
            const response = await axios.post<Response<UserResponse>>(`${BASE_URL}/users`, data, {
                headers: {
                    Authorization,
                },
            });
            user.value = response.data.item;
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
        createUser,
        user,
        term
    }
}

export default useCreateUser