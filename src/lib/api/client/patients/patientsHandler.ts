import { PatientType } from "@/src/types/components/patients/patients"
import axiosClient from "../axiosClient"
import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType"



export const createPatientApi=async(values:PatientType)=>{

    try{

        const resCreatePatientApi:resCustomType=await axiosClient.post('/patients',values)


        return {
          
      success: resCreatePatientApi.success,
      data: resCreatePatientApi.data,
      message:resCreatePatientApi.message,
      statusCode:resCreatePatientApi.statusCode,
    
        }




    }catch(error){


         const data=getApiErrorMessage(error)
        
                return {
                  success:false,
                  message: data
                };
    }

}



export const getAllPatientApi=async()=>{

  try{

    const resAllPatientApi:resCustomType=await axiosClient.get('/patients')

    
    return {
          
      success: resAllPatientApi.success,
      data: resAllPatientApi.data,
      message:resAllPatientApi.message,
      statusCode:resAllPatientApi.statusCode,
    
        }


  }catch(error){

     const data=getApiErrorMessage(error)
        
                return {
                  success:false,
                  message: data
                };
  }

}