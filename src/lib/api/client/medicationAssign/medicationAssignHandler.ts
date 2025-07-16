import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType";
import axiosClient from "../axiosClient";
import { medicationAssignFormValuesType } from "@/src/types/components/medicationAssign/medicationAssign";




export const createMedicationAssignApi=async(values:medicationAssignFormValuesType)=>{

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
                
          return { success:false, message: data };
    }
}







export const findAssignedMedicationsApi=async(id:string)=>{

  try{

    const resFindAssignedMedicationsApi:resCustomType=await axiosClient.get(`/medication-assign/patient/${id}`)


     return {
          
      success:resFindAssignedMedicationsApi.success,
      data:resFindAssignedMedicationsApi.data,
      message:resFindAssignedMedicationsApi.message,
      statusCode:resFindAssignedMedicationsApi.statusCode,
    
        }


  }catch(error){

          console.log(error)
          const data=getApiErrorMessage(error)
          return { success:false, message: data };
  }

}