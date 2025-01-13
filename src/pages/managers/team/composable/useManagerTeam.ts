import { ref } from "vue"
import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import useLoader from "@/composables/useLoader";
import type { UsersTeam } from "../interface/managerTeamsResponse.interface";
import type { Response } from '../../../../interfaces/reponse.interface';
import { getTeamId } from "@/auth/validateAuth.service";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useManagerTeam = () => {

  const team = ref<UsersTeam>({
        name: '',
        isPaid: false,
        isActive: true,
        managers: [],
        rosters: [],
        teamId: 0,
        branch: '',
        category: ''
  });
  const { displayLoader } = useLoader();
  const playersHeaders = [
    { key: '', title: '', },
    { key: 'name', title: 'Nombre', },
    { key: '', title: 'Disponibilidad', },
    { key: '', title: 'Acciones', },
  ]
  const getTeam = async () => {
    displayLoader.value = true;
    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    const userId = getTeamId();
    try {
      const response = await axios.get<Response<UsersTeam>>(`${BASE_URL}/teams/teamByUserId?userId=${userId} `, {
        headers: {
          Authorization,
        },
      });
      team.value = response.data.item;
      console.log(response.data.item)
      displayLoader.value = false;
      return response.data.item
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }


  return {
    getTeam,
    playersHeaders,
    team,

  }
}

export default useManagerTeam;