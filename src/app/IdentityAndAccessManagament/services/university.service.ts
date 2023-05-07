import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { University } from "../models/university";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl = 'http://localhost:8080/api/universities';

  constructor(private http: HttpClient) { }

  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiUrl);
  }

  getUniversityById(id: string): Observable<University> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<University>(url);
  }

  createUniversity(name: string, address: string): Observable<University> {
    const body = { name, address };
    return this.http.post<University>(this.apiUrl, body);
  }
}
