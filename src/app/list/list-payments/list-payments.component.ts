import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css']
})
export class ListPaymentsComponent implements OnInit {
  //declare variable to hold response and make it public to be accessible from components.html
  public payments: any;
  //initialize the call using capstoneService 
  constructor(private _myService: PaymentService, private router:Router) { }
  
  ngOnInit() {
      this.getPayments();
  }

  //method called OnInit
  getPayments() {
      this._myService.getPayments().subscribe(
         //read data and assign to public variable capstones
          data => { this.payments = data},
          err=> console.error(err),
          () => console.log('finished loading')
      );
  }
  
  onDelete(paymentId: string) {
    this._myService.deletePayment(paymentId);
    this.router.navigate(['/listPayments']);
  }
}
