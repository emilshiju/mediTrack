"use client"
import React, { useState ,useEffect} from "react"
import { Pill, Pencil, Trash2 } from 'lucide-react';
import toast from "react-hot-toast";
import { deleteMedicationApi, getAllMedicationApi } from "@/src/lib/api/client/medication/medicationHandler";
import { MedicationResType } from "@/src/types/components/medication/medication";
import ListMedicationDetailSkeleton from "@/src/components/skeleton/ListMedicationDetailsSkeleton";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/ui/Loader";


const MedicationTable = () => {

    const router = useRouter();

    const [allMedicationDetails,setAllMedicationDetails]=useState<MedicationResType[]>([])
    const [showLoader,setLoader]=useState(false)
    const [showSkeleton,setSkeleton]=useState(false)
    

    const fetchAllMedication=async()=>{


        try{

              const resAllMedicine=await getAllMedicationApi()
            
               if(resAllMedicine.success){
                setAllMedicationDetails(resAllMedicine.data)
               }


        }catch(error){
            console.log(error)
            toast.error("something went wrong , try again later")
        }finally{
           
            setSkeleton(true)
        }

    }


    useEffect(()=>{
        fetchAllMedication()
    },[])



    const onEdit=(id:string)=>{
        router.push(`/medications/${id}/edit`);
    }


    const onDelete=async(id:string)=>{

      setLoader(true)

      try{

        const resdeleted=await deleteMedicationApi(id)

        console.log("got resssssss")
        console.log(resdeleted)

        if(resdeleted.success&&resdeleted.data.status){
          fetchAllMedication()
          toast.success(resdeleted.message)
        }

        if(!resdeleted.success||!resdeleted.data.status){
          toast.error(resdeleted.message)
        }

      }catch(error){
        console.log(error)
        toast.error("something went wrong , try again later")
      }finally{
        setLoader(false)
      }

    }





  if(!showSkeleton){
    return <ListMedicationDetailSkeleton />
  }

  // if(showLoader){
  //   return <Loader />
  // }

  return (
    // <div className="w-full max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
    //   {/* Header */}
    //   <div className="px-6 pt-6 pb-2">
    //     <div className="flex items-center gap-3">
    //       <div className="p-2 bg-blue-100 rounded-lg">
    //         <Pill className="h-5 w-5 text-blue-600" />
    //       </div>
    //       <div>
    //         <h2 className="text-2xl font-bold text-gray-900">Medication List</h2>
    //         <p className="text-gray-600 text-sm mt-1">
    //           Current medications for the patient
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Table */}
    //   <div className="px-6 py-4">
    //     <div className="overflow-hidden border border-gray-200 rounded-lg">
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Medication Name
    //             </th>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Dosage
    //             </th>
    //             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Frequency
    //             </th>
    //             <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Actions
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {allMedicationDetails.map((medication) => (
    //             <tr key={medication.id} className="hover:bg-gray-50 transition-colors">
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm font-medium text-gray-900">{medication.name}</div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-gray-500">{medication.dosage}</div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="text-sm text-gray-500">{medication.frequency}</div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                 <div className="flex justify-end space-x-2">
    //                   <button
    //                     onClick={() => onEdit(medication.id)}
    //                     className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all"
    //                     title="Edit"
    //                   >
    //                     <Pencil className="h-4 w-4" />
    //                   </button>
    //                   <button
    //                     onClick={() => onDelete(medication.id)}
    //                     className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all"
    //                     title="Delete"
    //                   >
    //                     <Trash2 className="h-4 w-4" />
    //                   </button>
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     {allMedicationDetails.length === 0 && (
    //       <div className="text-center py-8">
    //         <div className="text-gray-500">No medications added yet</div>
    //       </div>
    //     )}
    //   </div>
    // </div>

<>
{showLoader&&<Loader />}

    <div className="w-full max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
  {/* Header */}
  <div className="px-6 pt-6 pb-2">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 rounded-lg">
        <Pill className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Medication List</h2>
        <p className="text-gray-600 text-sm mt-1">
          Current medications for the patient
        </p>
      </div>
    </div>
  </div>

  {/* Table */}
  <div className="px-6 py-4">
    <div className="overflow-x-auto"> {/* This enables horizontal scrolling */}
      <div className="inline-block min-w-full align-middle"> {/* Helps with alignment */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allMedicationDetails.map((medication) => (
              <tr key={medication.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{medication.dosage}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{medication.frequency}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(medication.id)}
                      className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(medication.id)}
                      className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {allMedicationDetails.length === 0 && (
      <div className="text-center py-8">
        <div className="text-gray-500">No medications added yet</div>
      </div>
    )}
  </div>
</div>
</>
  );
};

export default MedicationTable;