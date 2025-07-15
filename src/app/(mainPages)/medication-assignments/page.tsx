"use client"
import React, { useState, useRef } from 'react';
import { CalendarDays } from 'lucide-react';

function MyForm() {
  const [formData, setFormData] = useState<{ startDate: string }>({
    startDate: '',
  });
  const [errors, setErrors] = useState<{ startDate?: string }>({});
  const dateInputRef = useRef<HTMLInputElement>(null); // Properly typed ref

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputClick = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div>
      <label className="block text-base font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-blue-500" />
        Start Date
      </label>
      <div className="relative">
        <input
          type="date"
          name="startDate"
          value={formData.startDate} 
          onChange={handleChange}
          onClick={handleInputClick}
          ref={dateInputRef}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
      <p className="mt-1 text-sm text-gray-500">
        Select when the medication treatment should begin
      </p>
    </div>
  );
}

export default MyForm;