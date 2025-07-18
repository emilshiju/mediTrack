import * as Yup from 'yup';



const minDate = new Date(1900, 0, 1); 
const today = new Date();
today.setHours(0, 0, 0, 0); 


const patientSchema = Yup.object({

    name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
    dateOfBirth: Yup.date()
    .typeError('Please enter a valid date') 
    .required('Date of Birth is required')
    .min(minDate, 'Date of Birth cannot be before 1900')
    .max(today, 'Date of Birth cannot be in the future'),


})


export default patientSchema