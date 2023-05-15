import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UniversityDepressionIndicatorSet } from "../models/UniversityDepressionIndicatorSet";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService{
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUniversityDepressionIndicatorSet(universityId: string): Observable<UniversityDepressionIndicatorSet> {
    const url = `${this.baseUrl}/university/${universityId}/depressionIndicators`;
    return this.http.get<UniversityDepressionIndicatorSet>(url);
  }
}
