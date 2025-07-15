import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType"
import axiosClient from "../axiosClient"
import { MedicationType } from "@/src/types/components/medication/medication"


export const createMedicationApi=async(values:MedicationType)=>{

    try{


        const resCreateMedicationApi:resCustomType= await axiosClient.post('/medications',values)
        
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



export const getAllMedicationApi=async()=>{

  try{


    const resAllMedicationApi:resCustomType=await axiosClient.get('/medications')

     return {
          
      success: resAllMedicationApi.success,
      data:resAllMedicationApi.data,
      message:resAllMedicationApi.message,
      statusCode: resAllMedicationApi.statusCode,
    
        }




  }catch(error){

    const data=getApiErrorMessage(error)

        return {
          success:false,
          message: data
        };


  }
}