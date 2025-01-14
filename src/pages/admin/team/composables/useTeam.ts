import { ref } from "vue"
import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import type { TeamResponse } from "../interface/teamResponse.interface";
import useLoader from "@/composables/useLoader";
import { Category } from "@/enums/globaEnums";
import { Labels } from "@/utils/consts/string";


const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useTeam = () => {

  const teams = ref<TeamResponse[]>([]);
  const teamsHeader = [
    { key: 'name', title: 'Equipo', },
    { key: 'categoryName', title: 'Categoria', },
    { key: 'branchName', title: 'Rama', },
    { key: 'isPaid', title: 'Estado del Pago', },
    { key: 'isActive', title: 'Estado', },
    { key: '', title: 'Acciones', },
  ]
  const { displayLoader } = useLoader();
  const filterValues = ref( {
    term: null,
    category: null,
    branch: null,
    isPaid: null,
    isActive: null,
  });

  const term = ref("");

  const getTeams = async () => {
    displayLoader.value = true;
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    // Convertir el objeto a una cadena JSON
    const queryParams = {
      data: JSON.stringify(filterValues.value)
    };
    try {
      const response = await axios.get(`${BASE_URL}/teams`, {
        params: queryParams,
        headers: {
          Authorization,
        },
      });
      teams.value = response.data.items;
      displayLoader.value = false;
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  const getTeam = async (teamId: number) => {
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;

    try {
      displayLoader.value = true;
      const response = await axios.get(`${BASE_URL}/teams/${teamId}`, {
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

  const getTeamsForSelect = async () => {
    displayLoader.value = true;
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    try {
      const response = await axios.get(`${BASE_URL}/teams/getTeamsForSelect`, {
        headers: {
          Authorization,
        },
      });
      displayLoader.value = false;
      return response.data.items;
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  const getChiptext = (status: boolean) => {
    switch (status) {
        case true:
            return 'Activo'
        case false:
            return 'Inactivo'

    }
}

const getPaidtext = (status: boolean) => {
    switch (status) {
        case true:
            return 'Pagado'
        case false:
            return 'Pendiente'

    }
}

const getCategorytext = (category: Category) => {
    switch (category) {
        case Category.r:
            return Labels.categoriesLabels.rCategoryText;
        case Category.e:
            return Labels.categoriesLabels.eCategoryText;
        case Category.d:
            return Labels.categoriesLabels.dCategoryText;
        case Category.c:
            return Labels.categoriesLabels.cCategoryText;
        case Category.b:
            return Labels.categoriesLabels.bCategoryText;
        case Category.a:
            return Labels.categoriesLabels.aCategoryText;

    }
}

const getStatusChipColor = (status: boolean) => {
    switch (status) {
        case true:
            return '#4CAF50'
        case false:
            return '#F44336'
    }
}
  return {
    filterValues,
    getTeams,
    getTeam,
    getTeamsForSelect,
    teams,
    teamsHeader,
    term,
    getChiptext,
    getStatusChipColor,
    getCategorytext,
    getPaidtext
  }
}

export default useTeam;