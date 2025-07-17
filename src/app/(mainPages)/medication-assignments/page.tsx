
"use client"

import React, { useState, useEffect } from 'react';
import { Eye, User, Calendar, Users, Pill, X, Clock } from 'lucide-react';
import { getAllPatientApi } from '@/src/lib/api/client/patients/patientsHandler';
import { PatientResType } from '@/src/types/components/patients/patients';
import ListMedicationAssignSkeleton from '@/src/components/skeleton/ListMedicationAssignSkeleton';
import toast from 'react-hot-toast';
import { deleteAssignedMedicationApi, findAssignedMedicationsApi } from '@/src/lib/api/client/medicationAssign/medicationAssignHandler';
import { AssignedMedicationType } from '@/src/types/components/medicationAssign/medicationAssign';
import ListingModal from '@/src/components/ui/listingModal';


const PatientManagement = () => {
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showLoader,setLoader]=useState(false)

  const [namePatient,setNamePatient]=useState<string |null>(null)

  const [allPatients,setAllPatients]=useState<PatientResType[]>([])

  const [patientAssignedMedication,setPatientAssignedMedications]=useState<AssignedMedicationType []>([])


  const fetchAllPatients=async()=>{

    try{
       
        const resAllPatient=await getAllPatientApi()

        if(resAllPatient.success){
          console.log("got alll",resAllPatient.data)
          setAllPatients(resAllPatient.data)
        }

    }catch(error){
        
          console.log(error)
          toast.error("something went wrong , try again later")

    }finally {
        setLoader(true); 
  }


  }


  const fetchAssignedMedicine=async(id:string)=>{

    try{

     const resfindAssignedMedications =await  findAssignedMedicationsApi(id)

     if(resfindAssignedMedications.success){
      setPatientAssignedMedications(resfindAssignedMedications.data)
     }

     if(!resfindAssignedMedications.success){
      toast.error(resfindAssignedMedications.message)
     }

    }catch(error){
      console.log(error)
      toast.error("something went wrong , try again later")

    }finally{
      setIsModalOpen(true);
    }

     
  }


  useEffect(()=>{
    fetchAllPatients()
  },[])


  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);



  // Calculate patient age
  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  

  
  

  // Handle view patient
  const handleViewPatient = (id:string,name:string) => {
  
    fetchAssignedMedicine(id)
    setNamePatient(name)

  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNamePatient(null)
   
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


   

  const handleDelete=async(id:string)=>{

     

    try{

      const resDeleted=await deleteAssignedMedicationApi(id)

      if(resDeleted.success){
        toast.success(resDeleted.message)

        const filtered=patientAssignedMedication.filter((a,b)=>{
          if(a.id!==id){
            return a
          }
        })

        setPatientAssignedMedications(filtered)

        return true
      }
      if(!resDeleted.success){
        toast.error(resDeleted.message)
        return false
      }

    }catch(error){

      console.log(error)
      toast.error("something went wrong , try again later")
      return false

    }

   

  }



   if(!showLoader){
    return <><ListMedicationAssignSkeleton /></>
   }




  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 md:w-7 md:h-7 mr-3 text-blue-600" />
                Patient Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage patients and track their medication schedules
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-blue-600">{allPatients?.length}</div>
              <div className="text-sm text-gray-500">Total Patients</div>
            </div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-600" />
              Patient List
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  {/* <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medications
                  </th> */}
                  <th className="px-4 py-3 md:px-6 md:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allPatients?.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 md:px-6 md:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3 md:ml-4">
                          <div className="text-sm md:text-base font-medium text-gray-900">
                            {patient.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-6 md:py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(patient.dateOfBirth)}
                      </div>
                    </td>
                    <td className="px-4 py-4 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateAge(patient.dateOfBirth)} years
                    </td>
                   
                    <td className="px-4 py-4 md:px-6 md:py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewPatient(patient.id,patient.name)}
                        className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Eye className="w-4 h-4 mr-1 md:mr-2" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State (if no patients) */}
        {allPatients.length === 0 && (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8 md:p-12 text-center">
            <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Patients Found</h3>
            <p className="text-gray-500">Get started by adding your first patient.</p>
          </div>
        )}
      </div>









































{isModalOpen && patientAssignedMedication&& (
  
        <>
        <ListingModal  data={patientAssignedMedication} close={handleCloseModal} name={namePatient} deleteAssign={handleDelete}   />
          
        </>
      )}

    </div>
  );
};

export default PatientManagement;