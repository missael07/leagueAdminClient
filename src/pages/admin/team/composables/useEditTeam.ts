import { ref } from "vue"
import axios from "axios";
import type { TeamResponse } from "../interface/teamResponse.interface";
import type { Response } from "@/interfaces/reponse.interface";
import useHandleError from "@/composables/useHandleErrors";
import { Branch, Category } from "@/enums/globaEnums";
import useLoader from "@/composables/useLoader";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useEditTeam = () => {

  const team = ref<TeamResponse>({
    name: '',
    category: Category.selectCategory,
    branch: Branch.selectBranch,
    isPaid: false,
    isActive: true,
    branchName: '',
    categoryName: '',
    id: 0,
  });
  const term = ref("");
  const { displayErrors } = useHandleError();
  const { displayLoader } = useLoader();

  const editTeam = async () => {
    displayLoader.value = true;
    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    try {
      const data = {
        name: team.value.name,
        category: team.value.category,
        branch: team.value.branch,
        isPaid: team.value.isPaid,
        isActive: team.value.isActive,
      }

      const response = await axios.patch<Response<TeamResponse>>(`${BASE_URL}/teams/${team.value.id}`, data, {
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

  const changeTeamStatus = async (teamId: number) => {
    displayLoader.value = true;
    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    try {

      const response = await axios.put<Response<TeamResponse>>(`${BASE_URL}/teams/changeStatus/${teamId}`, null, {
        headers: {
          Authorization,
        },
      });

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        displayErrors(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  const pay = async (teamId: number) => {

    const token = localStorage.getItem("token");
    const Authorization = `Bearer ${token}`;
    try {

      const response = await axios.put<Response<TeamResponse>>(`${BASE_URL}/teams/pay/${teamId}`, null, {
        headers: {
          Authorization,
        },
      });

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        displayErrors(error);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return {
    changeTeamStatus,
    editTeam,
    pay,
    team,
    term
  }
}

export default useEditTeam;