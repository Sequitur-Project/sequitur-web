import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Student } from "../models/student";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Psychologist } from "../models/psychologist";



@Injectable({
  providedIn: 'root'
})
export class ListPsychologistsService {

  private universityUrl = 'https://back-sequitur-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  getAllPsychologistsByUniversityId(universityId: string): Observable<Psychologist[]> {
    const url = `${this.universityUrl}/universities/${universityId}/psychologists`;
    return this.http.get<Psychologist[]>(url);
  }

}
