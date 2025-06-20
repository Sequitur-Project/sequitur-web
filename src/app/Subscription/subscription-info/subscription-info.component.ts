import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionModel } from '../models/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';
import { ManagerService } from 'src/app/user/services/login-manager.service';

@Component({
  selector: 'app-subscription-info',
  templateUrl: './subscription-info.component.html',
  styleUrls: ['./subscription-info.component.css']
})
export class SubscriptionInfoComponent implements OnInit {
  subscription: SubscriptionModel;
  subscriptionButtonText: string = 'SUSCRIBIRSE';
  subscriptionButtonDisabled: boolean = false;
  isfinishedLoading: boolean = false;


  constructor(private subscriptionService: SubscriptionService, private dialog: MatDialog, private managerService: ManagerService) {}

  ngOnInit(): void {
    const subscriptionId = "1"; 
  this.subscriptionService.getSubscription(subscriptionId).subscribe(
    (subscription: SubscriptionModel) => {
      this.subscription = subscription;
    },
    (error: any) => {
      console.error(error);
    }
  );

    this.checkSubscriptionStatus();
  }
  checkSubscriptionStatus() {
    const managerId = this.managerService.getLoggedInManager()?.id; 
    if (managerId) {
      this.subscriptionService.isSubscribed(managerId).subscribe(status => {
        if (status) {
          this.subscriptionButtonText = 'Ya estás suscrito';
          this.subscriptionButtonDisabled = true;
          console.log(status);
        }
        setTimeout(() => {
          this.isfinishedLoading = true;
        }, 300);
      });
    }
  }

  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentInfoComponent, {
      width: '800px',
      height: '700px',
      data: { subscription: this.subscription },
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.checkSubscriptionStatus();
    });
  }
}
