
export class Appointment{
  id?: string;
  psychologistId: string;
  studentId: string;
  appointmentDate: Date;
  appointmentTime: string;
  appointmentLocation: string;
  reason: String;
  accepted: boolean;
}
