import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import useLoader from "@/composables/useLoader";
import type { Response } from '../../../../interfaces/reponse.interface';
import type { RosterResponse } from "../interfaces/rosterResponse";
import { ref } from "vue";
import apiClient from "@/plugins/apiClient";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useManagerRoster = () => {

  const players = ref<RosterResponse[]>([])
  const { displayLoader } = useLoader();
  const playersHeaders = [
    { key: '', title: '', },
    { key: 'name', title: 'Nombre', },
    { key: '', title: 'Disponibilidad', },
  ]

  const getRosters = async (teamId: number) => {
    displayLoader.value = true;
    try {
      const response = await apiClient.get<Response<RosterResponse>>(`/rosters?teamId=${teamId}`);

      displayLoader.value = false;
      players.value = response.data.items;
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  const getRoster = async (rosterId: number) => {
    displayLoader.value = true;
    try {
      const response = await apiClient.get<Response<RosterResponse>>(`${BASE_URL}/rosters/${rosterId}`);
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
    getRosters,
    getRoster,
    playersHeaders,
    players

  }
}

export default useManagerRoster;