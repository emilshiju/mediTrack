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





export const getMedicationApi=async(id:string)=>{

  try{
    
    const resMedicationApi:resCustomType=await axiosClient.get(`/medications/${id}`)


      return {
          
      success: resMedicationApi.success,
      data:resMedicationApi.data,
      message:resMedicationApi.message,
      statusCode: resMedicationApi.statusCode,
    
        }


  }catch(error){

    const data=getApiErrorMessage(error)

        return {
          success:false,
          message: data
        };

  }

  
}






export const updateMedicationApi=async(id:string,values:MedicationType)=>{

  try{


     const resUpateMedicationApi:resCustomType=await axiosClient.patch(`/medications/${id}`,values)


      return {
          
      success:resUpateMedicationApi.success,
      data:resUpateMedicationApi.data,
      message:resUpateMedicationApi.message,
      statusCode:resUpateMedicationApi.statusCode,
    
        }


  }catch(error){

    const data=getApiErrorMessage(error)

        return {
          success:false,
          message: data
        };

  }

}






export const deleteMedicationApi=async(id:string)=>{

  try{

    const resDeleteMedicationApi:resCustomType=await axiosClient.delete(`/medications/${id}`)
  console.log("vau",resDeleteMedicationApi.data)


     return {
          
      success:resDeleteMedicationApi.success,
      data:resDeleteMedicationApi.data,
      message:resDeleteMedicationApi.message,
      statusCode:resDeleteMedicationApi.statusCode,
    
        }


  }catch(error){
    console.log(error)
    const data=getApiErrorMessage(error)

    return {
          success:false,
          message: data
        };

  }

}