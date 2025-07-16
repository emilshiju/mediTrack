



export interface medicationAssignFormValuesType {
    patientId: string;
    medicationId: string;
    startDate: string;
    numberOfDays: string;
}

export interface AssignedMedicationType {
  id: string;
  medicationId: string;
  patientId: string;
  numberOfDays: number;
  startDate: string; 
  medication: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    createdAt: string; 
  };
  status: 'upcoming' | 'active' | 'finished';
  remainingDays: number;
  endDate: string;
};


export type ListingModalProps = {
  data: AssignedMedicationType[];
  close: () => void;
  name:string|null
};
