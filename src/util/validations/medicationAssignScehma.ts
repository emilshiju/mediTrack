import * as Yup from 'yup';


const today = new Date();
today.setHours(0, 0, 0, 0); // Set to start of day

const oneMonthLater = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
oneMonthLater.setHours(0, 0, 0, 0);


const medicationAssignScehma=Yup.object().shape({
    patientId: Yup.string().required("Please select a patient"),
    medicationId: Yup.string().required("Please select a medication"),
    startDate: Yup.date()
    .required("Please select a start date")
    .min(today, "Start date cannot be in the past")
    .max(oneMonthLater, "Start date cannot be more than one month in the future"),
    // startDate: Yup.string().required("Please select a start date"),
    numberOfDays: Yup.number()
      .required("Please enter number of days")
      .min(1, "Duration must be at least 1 day")
      .max(365, "Duration cannot exceed 365 days")
      .typeError("Please enter a valid number"),
})

export default medicationAssignScehma