const MedicationAssignSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r text-black p-6">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto mt-2"></div>
      </div>

      {/* Form Skeleton */}
      <div className="p-6 space-y-6">
        {/* Patient Selection Skeleton */}
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-100 rounded-md"></div>
        </div>

        {/* Medication Selection Skeleton */}
        <div>
          <div className="h-5 w-36 bg-gray-200 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-100 rounded-md"></div>
        </div>

        {/* Start Date Skeleton */}
        <div>
          <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-100 rounded-md relative">
            <div className="absolute right-3 top-3.5 h-5 w-5 bg-gray-200 rounded"></div>
          </div>
          <div className="h-3 w-64 bg-gray-100 rounded mt-2"></div>
        </div>

        {/* Duration Skeleton */}
        <div>
          <div className="h-5 w-44 bg-gray-200 rounded mb-2"></div>
          <div className="h-12 w-full bg-gray-100 rounded-md"></div>
          <div className="h-3 w-72 bg-gray-100 rounded mt-2"></div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-12 w-full bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default MedicationAssignSkeleton;
