import { ref } from "vue"
import axios from "axios";
import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import useLoader from "@/composables/useLoader";
import type { UserResponse } from "../interface/userResponse";
import { Role } from "@/enums/globaEnums";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useEditUser = () => {

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

    const editUser = async () => {
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
                isActive: user.value.isActive
            }
            const response = await axios.patch<Response<UserResponse>>(`${BASE_URL}/users/${user.value.id}`, data, {
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

    const changeUserStatus = async (userId: number) => {
        displayLoader.value = true;
        const token = localStorage.getItem("token");
        const Authorization = `Bearer ${token}`;
        try {
            const response = await axios.put<Response<UserResponse>>(`${BASE_URL}/users/${userId}`, null, {
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
        changeUserStatus,
        editUser,
        user,
        term
    }
}

export default useEditUser