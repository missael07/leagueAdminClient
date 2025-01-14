import Swal, { type SweetAlertIcon } from "sweetalert2";

export const errorModal = async (text: string) => {
 await displayModal("error", "Oops...", text);
};

export const succesModal = async (text: string) => {
  return await displayModal("success", 'Success', text);
}

export const sessionExpiredModal = async (text: string) => {
  return await displayModal("info", 'Success', text);
}
const getCurrentTheme = () => {
  // Este es solo un ejemplo; adapta esto a tu lógica de obtención del tema
  return localStorage.getItem("theme") || "light";
};



const displayModal = async (icon: SweetAlertIcon, title: string, text: string) => {
  const currentTheme = getCurrentTheme();
  const themeClass = currentTheme === "dark" ? "dark-mode" : "light-mode";
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 0,
    customClass: {
      confirmButton: "bg-primary",
      popup: themeClass,
    },
  }).then( () => {
    return true;
  });
};

