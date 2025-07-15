"use client";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Pill } from 'lucide-react';
import * as Yup from 'yup';
import { MedicationType } from '@/src/types/components/medication/medication';
import medicationSchema from '@/src/util/validations/medicationScehma';
import { createMedicationApi } from '@/src/lib/api/client/medication/medicationHandler';
import toast from 'react-hot-toast';



export default function MedicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: MedicationType = {
    name: '',
    dosage: '',
    frequency: ''
  };

  const handleSubmit = async (values: MedicationType, formikHelpers:FormikHelpers<MedicationType>) => {
    setIsSubmitting(true);
    
  
    try {

      const response=await  createMedicationApi(values)

      

      if(response.success){
        toast.success(response.message)
        formikHelpers.resetForm()
      }

       if(!response.success){
        toast.error(response.message)
      }


      // Handle form submission here
      console.log(values);
    }catch(error){

        console.log(error)
        toast.error("something went wrong , try again later")
      
    }
     finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Pill className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medication Information</h2>
            <p className="text-gray-600 text-sm mt-1">
              Add medication details for the patient
            </p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="px-6 py-4">
        <Formik
          initialValues={initialValues}
          validationSchema={medicationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5" noValidate>
              {/* Medication Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Medication Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Ibuprofen, Amoxicillin"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="name" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Dosage Field */}
              <div className="space-y-2">
                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                  Dosage *
                </label>
                <Field
                  id="dosage"
                  name="dosage"
                  type="text"
                  placeholder="e.g., 500mg, 10ml"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.dosage && touched.dosage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="dosage" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Frequency Field */}
              <div className="space-y-2">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                  Frequency *
                </label>
                <Field
                  as="select"
                  id="frequency"
                  name="frequency"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.frequency && touched.frequency ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="Every 4 hours">Every 4 hours</option>
                  <option value="Every 6 hours">Every 6 hours</option>
                  <option value="Every 8 hours">Every 8 hours</option>
                  <option value="As needed">As needed</option>
                </Field>
                <ErrorMessage name="frequency" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-2 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Pill className="h-4 w-4" />
                    <span>Add Medication</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}