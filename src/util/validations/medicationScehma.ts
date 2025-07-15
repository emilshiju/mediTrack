import * as Yup from 'yup';


const medicationSchema = Yup.object().shape({
  name: Yup.string().required('Medication name is required'),
  dosage: Yup.string().required('Dosage is required'),
  frequency: Yup.string().required('Frequency is required'),
});

export default medicationSchema