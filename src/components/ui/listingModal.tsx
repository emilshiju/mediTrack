import { ListingModalProps } from "@/src/types/components/medicationAssign/medicationAssign";
import { AssignedMedicationType } from "@/src/types/components/medicationAssign/medicationAssign";


import { Eye, User, Calendar, Users, Pill, X, Clock, Trash2 } from 'lucide-react';







const ListingModal=({ data, close ,name }: ListingModalProps)=>{


  const getMedicationStatus = (remainingDays: number, status: 'upcoming' | 'active' | 'finished') => {
  if (status === 'finished' ) {
    return {
      text: '✓ Completed',
      color: 'border border-gray-300 text-gray-600', // Neutral gray
    };
  } else if (status === 'active') {
    return {
      text: `⏳ ${remainingDays} days left`,
      color: 'border border-indigo-300 text-indigo-600', // Indigo accent
    };
  } else {
    return {
      text: `🗓 UPCOMING`,
      color: 'border border-slate-300 text-slate-600', // Muted slate
      
    };
  }
};



    return (


        <div 
            className="fixed inset-0 bg-black/50 z-[85] pointer-events-auto"
            onClick={close}
          >

          <div className="fixed inset-0 z-[90] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <div className="relative w-full max-w-7xl h-[90vh] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{name?name:"name"}</h2>
                    <p className="text-gray-600 mt-1">
                      {/* DOB: {new Date(selectedPatient.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} */}
                    </p>
                  </div>
                  <button
                    onClick={close}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Content */}
                <div className="h-[calc(90vh-120px)] overflow-y-auto p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Pill className="w-5 h-5 mr-2 text-blue-600" />
                      {/* Medications ({selectedPatient.medications.length}) */}
                      Medications ({data.length})
                    </h3>
                  </div>

                  {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Pill className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No medications found for this patient</p>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Medicine Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Dosage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Frequency
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Start Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Days Remaining
                            </th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.map((medication:AssignedMedicationType) => {
                            // const remainingDays = calculateRemainingDays(medication.medication);
                            return (
                              <tr key={medication.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {medication.medication.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {medication.medication.dosage}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center text-sm text-gray-900">
                                    <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                    {medication.medication.frequency}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center text-sm text-gray-900">
                                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                    {new Date(medication.startDate).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {medication.numberOfDays} days
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getMedicationStatus(medication.remainingDays,medication.status).color}`}>
                                    {/* {medication.remainingDays === 0 ? 'Completed' : `${medication.remainingDays} days`} */}
                                    {getMedicationStatus(medication.remainingDays,medication.status).text}
                                  </span>
                                </td>
                              <td className="px-6 py-4 whitespace-nowrap">
  <button
    // onClick={() => handleDelete(medication.id)}
    className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all"
    title="Delete medication"
  >
    <Trash2 className="h-4 w-4" />
  </button>
</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              
              </div>
            </div>
          </div>
          </div>
    )
}

export default ListingModal