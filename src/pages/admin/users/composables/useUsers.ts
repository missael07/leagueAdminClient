import { ref } from "vue"
import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import useLoader from "@/composables/useLoader";
import type { UserResponse } from "../interface/userResponse";
import type { Response } from "@/interfaces/reponse.interface";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useUser = () => {

  const users = ref<UserResponse[]>([]);
  const usersHeader = [
    { key: 'userName', title: 'Usuario', },
    { key: 'name', title: 'Nombre', },
    { key: 'email', title: 'E-mail', },
    { key: 'role', title: 'Rol', },
    { key: 'team', title: 'Equipos', },
    { key: 'isActive', title: 'Estado', },
    { key: '', title: 'Acciones', },
  ]
  const { displayLoader } = useLoader();
  const filterValues = ref( {
    term: null,
    team: null,
    role: null,
    isActive: null,
  });

  const term = ref("");

  const getUsers = async () => {
    displayLoader.value = true;
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const queryParams = {
      data: JSON.stringify(filterValues.value)
    };
    try {
      const response = await axios.get<Response<UserResponse>>(`${BASE_URL}/users`, {
        params: queryParams,
        headers: {
          Authorization,
        },
      });
      users.value = response.data.items;
      displayLoader.value = false;
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  const getUser = async (userId: number) => {
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;

    try {
      displayLoader.value = true;
      const response = await axios.get<Response<UserResponse>>(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization,
        },
      });
      displayLoader.value = false;
       return response.data.item;
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  return {
    filterValues,
    getUsers,
    getUser,
    users,
    usersHeader,
    term,

  }
}

export default useUser;