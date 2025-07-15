"use client"
import { useState } from 'react';
import { format } from 'date-fns';
import { UserPlus, Check } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import patientSchema from '@/src/util/validations/patientScehma';
import { PatientType } from '@/src/types/components/patients/patients';

export default function PatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: PatientType = {
    name: '',
    dateOfBirth: ''
  };

  const handleSubmit = async (values: PatientType) => {
    setIsSubmitting(true);
    try {
      // Handle form submission here
      console.log(values);
    } finally {
    //   setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 shadow-xl rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <UserPlus className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Patient Registration</h2>
            <p className="text-gray-600 text-sm mt-1">
              Enter patient information to create a new record
            </p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="px-6 py-4">
        <Formik
          initialValues={initialValues}
          validationSchema={patientSchema}
          onSubmit={handleSubmit}
        >
          {({ values , handleChange, handleBlur ,setFieldValue,errors, touched }) => (
            <Form className="space-y-5"  noValidate>
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Patient Name *
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.name && touched.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="name" component="p" className="text-sm text-red-600 mt-1" />
              </div>

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth *
                </label>
                <Field
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  values={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                   onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {  
    if (!/[0-9/-]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                />
               
                <ErrorMessage name="dateOfBirth" component="p" className="text-sm text-red-600 mt-1" />
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
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Register Patient</span>
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