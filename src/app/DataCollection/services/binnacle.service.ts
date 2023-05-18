import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Binnacle } from "../models/binnacle";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getBinnacleByStudentId(studentId: String): Observable<Binnacle> {
    const url = `${this.apiUrl}/students/${studentId}/binnacles`;
    return this.http.get<Binnacle>(url);
  }
}
