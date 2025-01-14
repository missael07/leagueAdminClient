import { ref } from "vue"
import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import useLoader from "@/composables/useLoader";
import type { UsersTeam } from "../interface/managerTeamsResponse.interface";
import type { Response } from '../../../../interfaces/reponse.interface';
import { getTeamId } from "@/auth/validateAuth.service";
import { Category, Role } from "@/enums/globaEnums";
import { Labels } from "@/utils/consts/string";


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
        category: Category.selectCategory
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
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const userId = getTeamId();
    try {
      const response = await axios.get<Response<UsersTeam>>(`${BASE_URL}/teams/teamByUserId?userId=${userId} `, {
        headers: {
          Authorization,
        },
      });
      team.value = response.data.item;
      displayLoader.value = false;
      return response.data.item
    } catch (error) {
      displayLoader.value = false;
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }

  
const getChiptext = (status: boolean | undefined) => {
  switch (status) {
      case true:
          return 'Activo'
      case false:
          return 'Inactivo'
  }
}

const getPaidtext = (status: boolean | undefined) => {
  switch (status) {
      case true:
          return 'Pagado'
      case false:
          return 'Pendiente'

  }
}

const getStatusChipColor = (status: boolean | undefined) => {
  switch (status) {
      case true:
          return '#4CAF50'
      case false:
          return '#F44336'
  }
}

const getRoleText = (role: Role) => {
  switch (role) {
      case Role.admin:
          return Labels.roleLabels.adminRoleText
      case Role.manager:
          return Labels.roleLabels.managerRoleText
      case Role.coach:
          return Labels.roleLabels.coachRoleText

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

  return {
    getTeam,
    playersHeaders,
    team,
    getChiptext,
    getCategorytext,
    getPaidtext,
    getRoleText,
    getStatusChipColor

  }
}

export default useManagerTeam;