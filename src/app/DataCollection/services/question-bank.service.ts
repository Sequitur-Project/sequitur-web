import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intent } from '../models/intent-model';
import { TrainingPhrase } from '../models/training-phrase-model';
import { ResponseModel } from '../models/response-model';



@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  constructor(private http: HttpClient) { }

  private baseUrl = 'https://sequitur-backend-2025-production.up.railway.app/api/intents';


  getQuestionBankData(): Observable<Intent[]> {
    console.log('Getting data from backend...');
    return this.http.get<Intent[]>(this.baseUrl);
  }

  addIntent(intent: Intent): Observable<Intent> {
    return this.http.post<Intent>(this.baseUrl, intent);
  }

  addTrainingPhrase(intentId: string, trainingPhrase: TrainingPhrase): Observable<TrainingPhrase>{
    const url = `${this.baseUrl}/${intentId}/trainingPhrases`;
    return this.http.post<TrainingPhrase>(url, trainingPhrase);
  }

  addResponse(intentId:string, response: ResponseModel): Observable<ResponseModel>{
    const url = `${this.baseUrl}/${intentId}/responses`;
    return this.http.post<ResponseModel>(url, response);
  }

  updateIntent(intent:Intent):Observable<Intent>{
    const url = `${this.baseUrl}/${intent.id}`;
    return this.http.put<Intent>(url, intent);
  }

  deleteIntent(intentId: String | undefined ): Observable<void> {
    const url = `${this.baseUrl}/${intentId}`;
    return this.http.delete<void>(url);
  }

  updateTrainingPhrase(intentId: string, trainingPhraseId: string, trainingPhrase: TrainingPhrase): Observable<TrainingPhrase> {
    const url = `${this.baseUrl}/${intentId}/trainingPhrases/${trainingPhraseId}`;
    return this.http.put<TrainingPhrase>(url, trainingPhrase);
  }

  deleteTrainingPhrase(intentId: String | undefined, trainingPhraseId: String | undefined):Observable<void> {
    const url = `${this.baseUrl}/${intentId}/trainingPhrases/${trainingPhraseId}`;
    return this.http.delete<void>(url);
  }

  updateResponse(intentId: string, responseId: string, response: ResponseModel): Observable<ResponseModel> {
    const url = `${this.baseUrl}/${intentId}/responses/${responseId}`;
    return this.http.put<ResponseModel>(url, response);
  }

  deleteResponse(intentId: String | undefined, responseId: String | undefined):Observable<void> {
    const url = `${this.baseUrl}/${intentId}/responses/${responseId}`;
    return this.http.delete<void>(url);
  }



}
