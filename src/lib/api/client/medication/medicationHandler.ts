import { getApiErrorMessage } from "@/src/types/api/resType"
import axiosClient from "../axiosClient"
import { MedicationType, resCreateMedicationType } from "@/src/types/components/medication/medication"


export const createMedicationApi=async(values:MedicationType)=>{

    try{


        const resCreateMedicationApi:resCreateMedicationType = await axiosClient.post('/medications',values)
        
        return {
          
      success: resCreateMedicationApi.success,
      data: resCreateMedicationApi.data,
      message:resCreateMedicationApi.message,
      statusCode: resCreateMedicationApi.statusCode,
    
        }


    }catch(error){

        const data=getApiErrorMessage(error)

        return {
          success:false,
          message: data
        };


    }
}