
export interface MedicationType  {
  name: string;
  dosage: string;
  frequency: string;
};

export interface resCreateMedicationType{

  success: boolean;
  data:any;
  message: string;
  statusCode: number;
  timestamp: string;
  
}