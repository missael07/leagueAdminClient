import { ref } from "vue";

import { AxiosError } from "axios";
import type { ErrorResponse, InvalidItem } from "@/interfaces/errorResponse.interface";
import { State } from "@/enums/globaEnums";
import { errorModal } from "@/services/sweetAlert.service";

interface FormErrors {
    [key: string]: string;
  }
const errors = ref<FormErrors>({});
const useHandleError = () => {

      const handleValidationErrors = (invalidItems: InvalidItem[]) => {
        errors.value = {};
        invalidItems.forEach((error: InvalidItem) => {
          errors.value[error.ItemName] = error.Message;
        });
      };
      const handleErrors = (error: AxiosError) => {
        const errorData = <ErrorResponse>error.response?.data;
        if(errorData) {
          if (errorData.State === State.invalid) {
            handleValidationErrors(errorData.ValidationResults.InvalidItems);
          } else {
            errorModal(errorData.Message || error.message);
            handleValidationErrors([]);
          }
        }
      };

      const getErrors = (errorss: FormErrors, input: string) => {

          return errorss[input] || [];
      }

      const resetErrors = () => {
        errors.value = {};
        handleValidationErrors([]);
      }
    return {
        handleValidationErrors,
        errors,
        displayErrors: handleErrors,
        getErrors,
        resetErrors
    }
}


export default useHandleError;