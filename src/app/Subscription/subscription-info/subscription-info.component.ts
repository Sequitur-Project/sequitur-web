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
  subscriptionButtonText: string = 'Subscribirse';
  subscriptionButtonDisabled: boolean = false;

  constructor(private subscriptionService: SubscriptionService, private dialog: MatDialog, private managerService: ManagerService) {}

  ngOnInit(): void {
    const subscriptionId = "1"; // or any other id you want to retrieve
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
    const managerId = this.managerService.getLoggedInManager()?.id; // Replace with the actual manager ID
    if (managerId) {
      this.subscriptionService.isSubscribed(managerId).subscribe(status => {
        if (status) {
          this.subscriptionButtonText = 'Ya estás suscrito';
          this.subscriptionButtonDisabled = true;
          console.log(status);
        }
      });
    }
  }

  openPaymentDialog() {
    const dialogRef = this.dialog.open(PaymentInfoComponent, {
      width: '800px',
      height: '700px',
      data: { subscription: this.subscription }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
