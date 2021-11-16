import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.css']
})
export class ListDeliveryComponent implements OnInit {

  public deliveries: any;

  constructor(private _deliveryService: DeliveryService, private router:Router ) { }

  ngOnInit(): void {
    this.getDeliveryDetails();
  }
  //   //method called OnInit
  getDeliveryDetails() {
    this._deliveryService.getDeliveryDetails().subscribe(
        //read data and assign to public variable projectProposal
        data => { this.deliveries = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
  }
    onDelete(deliveryId: string) {
      this._deliveryService.deleteDeliveryDetails(deliveryId);
      this.router.navigate(['/listDeliveryDetails']);
    }
}
