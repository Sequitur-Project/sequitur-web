import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Conversation } from "../models/conversation";
import { ConversationResource } from "../models/conversation-resource";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'https://back-sequitur-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getConversationByStudentId(studentId: string): Observable<ConversationResource> {
    const url = `${this.apiUrl}/students/${studentId}/conversations`;
    return this.http.get<ConversationResource>(url);
  }
}
