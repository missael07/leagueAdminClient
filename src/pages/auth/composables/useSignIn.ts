import { ref } from "vue"
import axios from "axios";
import useHandleError from "@/composables/useHandleErrors";
import useLoader from "@/composables/useLoader";
import type { Response } from "@/interfaces/reponse.interface";
import type { AuthResponse } from "../interfaces/authResponse.interface";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useSignIn = () => {

    const term = ref("");
    const { displayErrors } = useHandleError();
    const { displayLoader } = useLoader();

    const auth = ref({
        userName: 'mpadilla',
        password: 'L!g4pR3m!3rP@ssw0rd'
    })

    const signIn = async () => {
        displayLoader.value = true;
        const token = localStorage.getItem("authToken");
        const Authorization = `Bearer ${token}`;
        try {
           
            const response = await axios.post<Response<AuthResponse>>(`${BASE_URL}/auth`, auth.value, {
                headers: {
                    Authorization,
                },
            });

            displayLoader.value = false;
            return response.data.item
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
        auth,
        signIn,
        term
    }
}

export default useSignIn;