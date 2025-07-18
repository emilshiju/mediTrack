import { PatientType } from "@/src/types/components/patients/patients";
import axiosClient from "../axiosClient";
import { getApiErrorMessage, resCustomType } from "@/src/types/api/resType";

export const createPatientApi = async (values: PatientType) => {
  try {
    const resCreatePatientApi: resCustomType = await axiosClient.post(
      "/patients",
      values
    );

    return {
      success: resCreatePatientApi.success,
      data: resCreatePatientApi.data,
      message: resCreatePatientApi.message,
      statusCode: resCreatePatientApi.statusCode,
    };
  } catch (error) {
    const data = getApiErrorMessage(error);

    return {
      success: false,
      message: data,
    };
  }
};

export const getAllPatientApi = async () => {
  try {
    const resAllPatientApi: resCustomType = await axiosClient.get("/patients");

    return {
      success: resAllPatientApi.success,
      data: resAllPatientApi.data,
      message: resAllPatientApi.message,
      statusCode: resAllPatientApi.statusCode,
    };
  } catch (error) {
    const data = getApiErrorMessage(error);

    return {
      success: false,
      message: data,
    };
  }
};

export const getPatientApi = async (id: string) => {
  try {
    const resPatientApi: resCustomType = await axiosClient.get(
      `/patients/${id}`
    );

    return {
      success: resPatientApi.success,
      data: resPatientApi.data,
      message: resPatientApi.message,
      statusCode: resPatientApi.statusCode,
    };
  } catch (error) {
    const data = getApiErrorMessage(error);

    return {
      success: false,
      message: data,
    };
  }
};

export const updatePatientApi = async (id: string, values: PatientType) => {
  try {
    const resUpdatePatientApi: resCustomType = await axiosClient.patch(
      `/patients/${id}`,
      values
    );

    return {
      success: resUpdatePatientApi.success,
      data: resUpdatePatientApi.data,
      message: resUpdatePatientApi.message,
      statusCode: resUpdatePatientApi.statusCode,
    };
  } catch (error) {
    const data = getApiErrorMessage(error);

    return {
      success: false,
      message: data,
    };
  }
};

export const deletePatientApi = async (id: string) => {
  try {
    const resDeletePatientApi: resCustomType = await axiosClient.delete(
      `/patients/${id}`
    );

    return {
      success: resDeletePatientApi.success,
      data: resDeletePatientApi.data,
      message: resDeletePatientApi.message,
      statusCode: resDeletePatientApi.statusCode,
    };
  } catch (error) {
    const data = getApiErrorMessage(error);

    return {
      success: false,
      message: data,
    };
  }
};
