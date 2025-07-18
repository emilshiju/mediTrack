const ListMedicationAssignSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0 space-y-3">
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-80 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="text-center md:text-right space-y-2">
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-200 bg-gray-50">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <th key={i} className="px-4 py-3 md:px-6 md:py-3">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row} className="hover:bg-gray-50 transition-colors">
                    {[1, 2, 3, 4, 5].map((cell) => (
                      <td
                        key={cell}
                        className="px-4 py-4 md:px-6 md:py-4 whitespace-nowrap"
                      >
                        <div className="flex items-center">
                          {cell === 1 && (
                            <>
                              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="ml-3 md:ml-4">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                              </div>
                            </>
                          )}
                          {cell === 2 && (
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          )}
                          {cell === 3 && (
                            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                          )}
                          {cell === 4 && (
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                          )}
                          {cell === 5 && (
                            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMedicationAssignSkeleton;
