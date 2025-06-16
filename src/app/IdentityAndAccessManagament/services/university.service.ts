import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { University } from "../models/university";
import { UpdateUniversityResource } from "../models/university-resource";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl = 'https://sequitur-backend-2025-production.up.railway.app/api/universities';

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
  updateUniversity(universityId: string, resource: UpdateUniversityResource): Observable<UpdateUniversityResource> {
    const url = `${this.apiUrl}/${universityId}`;
    return this.http.put<UpdateUniversityResource>(url, resource);
  }
}
