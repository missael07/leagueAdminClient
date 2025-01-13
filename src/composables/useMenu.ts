import { ref } from "vue"
import axios from "axios";
import { errorModal } from "@/services/sweetAlert.service";
import { getUserRole } from "@/auth/validateAuth.service";


const menu = ref<MenuItem[]>([]);
interface MenuItem {
  menuIcon: string
  menuItem: string,
  menuRoute: string,
}

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const useMenu = () => {

  const getMenu = async () => {

    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const role = getUserRole(token!);
    try {
      const response = await axios.get(`${BASE_URL}/menu?role=${role}`, {
        headers: {
          Authorization,
        },
      });
      menu.value = response.data.items;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorModal(error.response?.data.message)
      }
    }
  }


  return {
    getMenu,
    menu
  }
}

export default useMenu;