


const ListMedicationDetailSkeleton=()=>{

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
  {/* Header Skeleton */}
  <div className="px-6 pt-6 pb-2">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-200 rounded-lg animate-pulse">
        <div className="h-5 w-5"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  </div>

  {/* Table Skeleton */}
  <div className="px-6 py-4">
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Medication Name', 'Dosage', 'Frequency', 'Actions'].map((header) => (
              <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-end space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
    )


}

export default ListMedicationDetailSkeleton