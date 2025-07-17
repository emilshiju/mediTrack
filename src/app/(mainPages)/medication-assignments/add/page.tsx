

"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarIcon, Pill, User, Clock, Calendar as CalendarDays } from "lucide-react";
import { ErrorMessage, Field, Form, Formik, FormikHandlers, FormikHelpers } from "formik";
import medicationAssignScehma from "@/src/util/validations/medicationAssignScehma";
import { medicationAssignFormValuesType } from "@/src/types/components/medicationAssign/medicationAssign";
import { getAllMedicationApi } from "@/src/lib/api/client/medication/medicationHandler";
import { getAllPatientApi } from "@/src/lib/api/client/patients/patientsHandler";
import { PatientResType } from "@/src/types/components/patients/patients";
import { MedicationResType } from "@/src/types/components/medication/medication";
import MedicationAssignSkeleton from "@/src/components/skeleton/MedicationAssignSkeleton";
import { createMedicationAssignApi } from "@/src/lib/api/client/medicationAssign/medicationAssignHandler";
import toast from "react-hot-toast";


const MedicationAssignmentForm = () => {
  

  const [allPatients,setAllPatients]=useState<PatientResType[]>([])

  const [allMedication,setAllMedication]=useState<MedicationResType[]>([])

  const [showLoader,setLoader]=useState(false)




  const fetchAll=async()=>{


    try{

          const resAllMedicine=await getAllMedicationApi()

          if(resAllMedicine.success){
                setAllMedication(resAllMedicine.data)
            }

          const resAllPatient=await getAllPatientApi()

          if(resAllPatient.success){
                setAllPatients(resAllPatient.data)
            }


    }catch(error){
        console.log(error)
        toast.error("something went wrong , try again later")
    }finally{
        setLoader(true)
    }

   


  }



  useEffect(()=>{
    fetchAll()
  },[])



  



  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleCalenderClick=()=>{
     if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    }
  }


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const initialValues: medicationAssignFormValuesType = {
    patientId: "",
    medicationId: "",
    startDate: "",
    numberOfDays: "",
  };


  const handleSubmit=async(values:medicationAssignFormValuesType,formikHelpers:FormikHelpers<medicationAssignFormValuesType>)=>{


    setIsSubmitting(true)

    try{

       const response=await createMedicationAssignApi(values)

       

       if(response.success&&response.data.status==true){
        formikHelpers.resetForm()
        toast.success(response.message)
       }

       if(response.success&&response.data.status==false){
        toast.error(response.message)
       }

       if(!response.success){
        toast.error(response.message)
       }

    }catch(error){
      console.log(error)
      toast.error("something went wrong , try again later")
    }finally{
      setIsSubmitting(false)
    }
    



  }



  
   


  if(!showLoader){
    return <div><MedicationAssignSkeleton /></div>
  }
  



  return (
    <>
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r text-black p-6">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Pill className="h-6 w-6" />
          Medication Assignment
        </h1>
        <p className="text-gray-700 text-center mt-1">
          Assign medications to patients with proper scheduling
        </p>
      </div>

      {/* Form */}
      <div className="p-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

<Formik
          initialValues={initialValues}
          validationSchema={medicationAssignScehma}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors }) => (

        <Form className="space-y-6" noValidate>
          {/* Patient Selection */}
          <div>
            <label className=" text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              Select Patient
            </label>
            <Field
              as="select"
              name="patientId"
              className={`w-full p-3 border rounded-md ${errors.patientId ? "border-red-500" : "border-gray-300"}`}
              disabled={isSubmitting}
            >
              <option value="">Choose a patient...</option>
              {/* {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.age}, MRN: {patient.mrn})
                </option>
              ))} */}
               {allPatients?.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Age: {patient.dateOfBirth})
                </option>
              ))}
            </Field>
            
           <ErrorMessage name="patientId" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Medication Selection */}
          <div>
            <label className=" text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Pill className="h-4 w-4 text-blue-500" />
              Select Medication
            </label>
            <Field
              as="select"
              name="medicationId"
              className={`w-full p-3 border rounded-md ${errors.medicationId ? "border-red-500" : "border-gray-300"}`}
              disabled={isSubmitting}
            >
              <option value="">Choose a medication...</option>
              {/* {medications.map(medication => (
                <option key={medication.id} value={medication.id}>
                  {medication.name} {medication.dosage} ({medication.type})
                </option>
              ))} */}
              {allMedication?.map(medication => (
                <option key={medication.id} value={medication.id}>
                  {medication.name} - {medication.dosage} 
                </option>
              ))}
            </Field>
             <ErrorMessage name="medicationId" component="p" className="mt-1 text-sm text-red-600" />
            
          </div>

          {/* Start Date */}
          <div>
            <label className=" text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-blue-500" />
              Start Date
            </label>
            <div className="relative">
              <Field
                type="date"
                name="startDate"
                ref={dateInputRef}
                className={`w-full p-3 border rounded-md ${errors.startDate ? "border-red-500" : "border-gray-300"}`}
                disabled={isSubmitting}
              />
              <CalendarIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 " onClick={handleCalenderClick} />
            </div>
            <ErrorMessage name="startDate" component="p" className="mt-1 text-sm text-red-600" />
            <p className="mt-1 text-sm text-gray-500">
              Select when the medication treatment should begin
            </p>
          </div>

          {/* Number of Days */}
          <div>
            <label className="text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              Duration (Number of Days)
            </label>
            <Field
              type="number"
              name="numberOfDays"
              min="1"
              max="365"
              placeholder="Enter number of days"
              className={`w-full p-3 border rounded-md ${errors.numberOfDays ? "border-red-500" : "border-gray-300"}`}
              disabled={isSubmitting}
            />
            <ErrorMessage name="numberOfDays" component="p" className="mt-1 text-sm text-red-600" />
            <p className="mt-1 text-sm text-gray-500">
              Enter the treatment duration in days (1-365)
            </p>
          </div>

       

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded-md font-semibold text-white flex items-center justify-center gap-2 ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <span></span> Save Medication Assignment
              </>
            )}
          </button>
        </Form>)}
        </Formik>
      </div>
    </div>
    </>
  );
};

export default MedicationAssignmentForm;