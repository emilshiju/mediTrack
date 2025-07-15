import * as Yup from 'yup';

const patientSchema = Yup.object({

    name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  dateOfBirth: Yup.string()
  .required('Date of Birth is required')
  .test('valid-format', 'Please enter a valid date', (value) => {
      if (!value) return false;
      // Accept either YYYY-MM-DD or DD-MM-YYYY
      return /^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{2}-\d{2}-\d{4}$/.test(value);
    })
  .test('min-date', 'Date of Birth cannot be before 1900', (value) => {
    if (!value) return false;
    const date = new Date(value);
    const minDate = new Date(1900, 0, 1); // Jan 1, 1900
    return date >= minDate;
  })
  .test('max-date', 'Date of Birth cannot be in the future', (value) => {
    if (!value) return false;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare only dates (ignore time)
    return date <= today;
  }),
})


export default patientSchema