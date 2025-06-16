import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recommendation } from "src/app/DiagnosticTreatment/models/recommendation";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private readonly apiUrl = 'https://sequitur-backend-2025-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  createRecommendation(psychologistId: string, studentId: string, recommendation: Recommendation): Observable<Recommendation> {
    const url = `${this.apiUrl}/psychologists/${psychologistId}/students/${studentId}/recommendations`;
    return this.http.post<Recommendation>(url, recommendation);
  }
}
