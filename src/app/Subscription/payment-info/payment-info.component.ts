import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionModel } from '../models/Subscription';
import { PaymentMethodRequest } from '../models/PaymentMethod';
import { SubscriptionService } from '../services/subscription.service';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;


  constructor(
    public dialogRef: MatDialogRef<PaymentInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subscription: SubscriptionModel },
    private elRef: ElementRef,
    private subscriptionService: SubscriptionService,
    private managerService: ManagerService,
    private snackBar: MatSnackBar
  ) {
  }

  onSubscribe() {
    const paymentMethod: PaymentMethodRequest = {
      cardNumber: this.cardNumber,
      expiryMonth: this.expiryMonth,
      expiryYear: this.expiryYear,
      cvc: this.cvc
    };
    const managerId = this.managerService.getLoggedInManager()?.id;
    console.log(managerId);
    const subscriptionId = "1";
    if (managerId) {
      this.subscriptionService.subscribe(managerId, subscriptionId, paymentMethod)
        .subscribe(response => {

          this.dialogRef.close();
          this.snackBar.open('Compra realizada con éxito', 'Cerrar', {
            duration: 3000
          });
        }, error => {
          this.snackBar.open('Hubo un error con la compra', 'Cerrar', {
            duration: 3000
          });
        });
    } else {
      console.error("Manager ID is undefined.");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.elRef.nativeElement.querySelector('.card-number-input').addEventListener('input', () =>{
      this.elRef.nativeElement.querySelector('.card-number-box').innerText = this.elRef.nativeElement.querySelector('.card-number-input').value;
    });

    this.elRef.nativeElement.querySelector('.card-holder-input').addEventListener('input', () =>{
      this.elRef.nativeElement.querySelector('.card-holder-name').innerText = this.elRef.nativeElement.querySelector('.card-holder-input').value;
    });

    this.elRef.nativeElement.querySelector('.month-input').addEventListener('input', () =>{
      this.elRef.nativeElement.querySelector('.exp-month').innerText = this.elRef.nativeElement.querySelector('.month-input').value;
    });

    this.elRef.nativeElement.querySelector('.year-input').addEventListener('input', () =>{
      this.elRef.nativeElement.querySelector('.exp-year').innerText = this.elRef.nativeElement.querySelector('.year-input').value;
    });

    this.elRef.nativeElement.querySelector('.cvv-input').addEventListener('mouseenter', () =>{
      this.elRef.nativeElement.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
      this.elRef.nativeElement.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
    });

    this.elRef.nativeElement.querySelector('.cvv-input').addEventListener('mouseleave', () =>{
      this.elRef.nativeElement.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
      this.elRef.nativeElement.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
    });

    this.elRef.nativeElement.querySelector('.cvv-input').addEventListener('input', () =>{
      this.elRef.nativeElement.querySelector('.cvv-box').innerText = this.elRef.nativeElement.querySelector('.cvv-input').value;
    });
  }

}
