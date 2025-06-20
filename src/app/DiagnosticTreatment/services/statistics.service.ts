import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UniversityDepressionIndicatorSet } from "../models/UniversityDepressionIndicatorSet";
import { Statistics } from "src/app/DataCollection/models/statistics-model";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService{
  private baseUrl = 'https://sequitur-backend-2025-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  getUniversityDepressionIndicatorSet(universityId: string): Observable<Statistics> {
    const url = `${this.baseUrl}/university/${universityId}/depressionIndicators`;
    return this.http.get<Statistics>(url);
  }
}
