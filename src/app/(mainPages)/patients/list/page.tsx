"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2, User } from "lucide-react";
import { PatientResType } from "@/src/types/components/patients/patients";
import toast from "react-hot-toast";
import {
  deletePatientApi,
  getAllPatientApi,
} from "@/src/lib/api/client/patients/patientsHandler";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/ui/Loader";

export default function UserTable() {
  const router = useRouter();

  const [showLoading, setLoading] = useState(false);

  const [allPatients, setAllPatients] = useState<PatientResType[]>([]);

  const fetchAllPatient = async () => {
    try {
      const resAllPatient = await getAllPatientApi();

      if (resAllPatient.success) {
        setAllPatients(resAllPatient.data);
      }

      if (resAllPatient.success == false) {
        toast.error(resAllPatient.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong , try again later");
    }
  };

  useEffect(() => {
    fetchAllPatient();
  }, []);

  const handleDelete = async (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item all the related medication assignments will delete?"
      )
    ) {
      setLoading(true);

      try {
        const response = await deletePatientApi(userId);

        if (response.success) {
          toast.success(response.message);

          const filteredData = allPatients.filter((a, b) => {
            if (a.id !== userId) {
              return a;
            }
          });
          setAllPatients(filteredData);
        }

        if (!response.success) {
          toast.error(response.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong , try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (userId: string) => {
    router.push(`/patients/${userId}/edit`);
  };

  return (
    <>
      {showLoading && <Loader />}
      <div className="w-full max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                User Management
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                View and manage all registered users
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date of Birth
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allPatients &&
                  allPatients.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.dateOfBirth}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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

          {allPatients.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">No patients added yet</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
