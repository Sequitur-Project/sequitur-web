import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Manager } from "src/app/IdentityAndAccessManagament/models/manager";
import { UpdateManagerResource } from "src/app/IdentityAndAccessManagament/models/manager-resource";
import { Psychologist } from "src/app/IdentityAndAccessManagament/models/psychologist";
import { SaveManager } from "src/app/IdentityAndAccessManagament/models/save-manager-resource";


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'https://back-sequitur-production.up.railway.app/api'; // replace with your backend API URL
  private loggedInManager: Manager| undefined;

  constructor(private http: HttpClient) { }

  getManager(id: string): Observable<Manager> {
    const url = `${this.apiUrl}/managers/${id}`;
    return this.http.get<Manager>(url);
  }

  updateManager(managerId: string, manager: UpdateManagerResource): Observable<UpdateManagerResource> {
    const url = `${this.apiUrl}/managers/${managerId}`;
    return this.http.put<UpdateManagerResource>(url, manager);
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

  createManager(resource: SaveManager): Observable<SaveManager> {
    const url = `${this.apiUrl}/managers`;
    return this.http.post<Manager>(url, resource);
  }
  }


