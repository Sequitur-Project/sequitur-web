import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../models/appointment";
import { Observable } from "rxjs";
import { AppointmentResource } from "../models/appointment-resource";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'https://sequitur-backend-2025-production.up.railway.app/api';
  constructor(private http: HttpClient) {}

  createAppointment(psychologistId: string, studentId: string, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/psychologists/${psychologistId}/students/${studentId}/appointments`, appointment);
  }

  getAllAppointmentsByPsychologistId(psychologistId: string): Observable<AppointmentResource[]> {
    const url = `${this.baseUrl}/psychologists/${psychologistId}/appointments`;
    return this.http.get<AppointmentResource[]>(url);
  }

}
