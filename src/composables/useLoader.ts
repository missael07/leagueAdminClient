import { ref } from "vue";

const displayLoader = ref(false);
const useLoader = () => {


    return {
        displayLoader
    }
}

export default useLoader;
