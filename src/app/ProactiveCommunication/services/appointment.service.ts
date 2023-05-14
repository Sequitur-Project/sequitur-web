import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appointment } from "../models/appointment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  createAppointment(psychologistId: string, studentId: string, appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/psychologists/${psychologistId}/students/${studentId}/appointments`, appointment);
  }

}
