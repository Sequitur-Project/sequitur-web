import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { SubscriptionModel } from "../models/Subscription";
import { PaymentMethodRequest } from "../models/PaymentMethod";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'https://back-sequitur-production.up.railway.app/api/subscriptions';


  constructor(private http: HttpClient) { }

  getSubscription(id: string): Observable<SubscriptionModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SubscriptionModel>(url);
  }

  subscribe(managerId: string, subscriptionId: string, paymentMethod: PaymentMethodRequest): Observable<any> {
    const url = `https://back-sequitur-production.up.railway.app/api/managers/${managerId}/subscribe/${subscriptionId}`;
    return this.http.post<any>(url, paymentMethod);
  }


  isSubscribed(managerId: string) {
    return this.http.get<boolean>(`https://back-sequitur-production.up.railway.app/api/managers/${managerId}/status`);
  }


}
