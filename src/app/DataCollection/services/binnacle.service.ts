import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Binnacle } from "../models/binnacle";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  private apiUrl = 'https://sequitur-backend-2025-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  getBinnacleByStudentId(studentId: String): Observable<Binnacle> {
    const url = `${this.apiUrl}/students/${studentId}/binnacles`;
    return this.http.get<Binnacle>(url);
  }
}
