import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Manager } from "src/app/IdentityAndAccessManagament/models/manager";
import { Psychologist } from "src/app/IdentityAndAccessManagament/models/psychologist";


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080/api'; // replace with your backend API URL
  private loggedInManager: Manager| undefined;

  constructor(private http: HttpClient) { }

  getManager(id: string): Observable<Manager> {
    const url = `${this.apiUrl}/managers/${id}`;
    return this.http.get<Manager>(url);
  }

  getManagerByEmailAndPasswordAndRole(email: string, password: string, role: string): Observable<Manager> {
    const url = `${this.apiUrl}/managers/login`;
    const params = new HttpParams()
      .set('email', email)
      .set('password', password)
      .set('role', role);
    return this.http.get<Manager>(url, { params });
  }

  logout() {
    this.loggedInManager = undefined;
    sessionStorage.removeItem('loggedInManager');
    sessionStorage.clear();
  }

  setLoggedInManager(manager: Manager) {
    this.loggedInManager = manager;
    sessionStorage.setItem('loggedInManager', JSON.stringify(manager));
  }

  getLoggedInManager(): Manager | undefined {
    if (!this.loggedInManager) {
      const storedData = sessionStorage.getItem('loggedInManager');
      if (storedData) {
        this.loggedInManager = JSON.parse(storedData);
      }
    }
    return this.loggedInManager as Manager;
  }
  }


