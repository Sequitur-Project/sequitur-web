import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Psychologist } from "src/app/IdentityAndAccessManagament/models/psychologist";


@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  private apiUrl = 'http://localhost:8080/api'; // replace with your backend API URL
  private loggedInPsychologist: Psychologist| undefined;

  constructor(private http: HttpClient) { }

  getPsychologist(id: string): Observable<Psychologist> {
    const url = `${this.apiUrl}/psychologists/${id}`;
    return this.http.get<Psychologist>(url);
  }

  getPsychologistByEmailAndPasswordAndRole(email: string, password: string, role: string): Observable<Psychologist> {
    const url = `${this.apiUrl}/psychologists/login`;
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('role', role);
    return this.http.get<Psychologist>(url, { params });
  }

  createPsychologist(firstName: string, lastName: string, email: string, password: string, telephone: string, universityId: string): Observable<Psychologist> {
    const url = `${this.apiUrl}/universities/${universityId}/psychologists`;
    const body = { firstName, lastName, email, password, telephone, universityId };
    return this.http.post<Psychologist>(url, body);
  }


  logout() {
    this.loggedInPsychologist = undefined;
    sessionStorage.removeItem('loggedInPsychologist');
    sessionStorage.clear();
  }

  setLoggedInPsychologist(psychologist: Psychologist) {
    this.loggedInPsychologist = psychologist;
    sessionStorage.setItem('loggedInPsychologist', JSON.stringify(psychologist));
  }

  getLoggedInPsychologist(): Psychologist | undefined {
    if (!this.loggedInPsychologist) {
      const storedData = sessionStorage.getItem('loggedInPsychologist');
      if (storedData) {
        this.loggedInPsychologist = JSON.parse(storedData);
      }
    }
    return this.loggedInPsychologist;
  }
  }


