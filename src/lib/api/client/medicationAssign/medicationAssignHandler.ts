import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType";
import axiosClient from "../axiosClient";
import { medicationAssignFormValuesType } from "@/src/types/components/medicationAssign/medicationAssign";




export const createMedicationAssign=async(values:medicationAssignFormValuesType)=>{

    try{

        const resCreateMedicationAssignApi:resCustomType=await axiosClient.post('/medication-assign',values)

         return {
          
      success:resCreateMedicationAssignApi.success,
      data:resCreateMedicationAssignApi.data,
      message:resCreateMedicationAssignApi.message,
      statusCode:resCreateMedicationAssignApi.statusCode,
    
        }


    }catch(error){

        const data=getApiErrorMessage(error)
                
                        return {
                          success:false,
                          message: data
                        };
    }
}