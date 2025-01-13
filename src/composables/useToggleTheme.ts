import { useTheme } from "vuetify";

const useToggleTheme = () => {

    const theme = useTheme();
    
    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
      localStorage.setItem('theme', theme.global.name.value);
    }
    return {
      theme,  
      toggleTheme
    }
}

export default useToggleTheme;