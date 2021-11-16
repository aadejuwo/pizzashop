import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DeliveryService {
   // contextRoot: string= "http://localhost:8000/pizza/";

    
    constructor(private http:HttpClient, private router: Router) {
       // this.url = 'listProject';
    }

    getGoogLocation(apiKey: any){
        return this.http.get("https://www.googleapis.com/geolocation/v1/geolocate?key="+apiKey);
    }
    // Uses http.get() to load data 
    getDeliveryDetails() {
        return this.http.get("http://localhost:8000/deliveryDetails");
    }

    //Uses http.post() to post data 
    addDeliveryDetails(zip: string, flat: string, street: string, city: string, state: string, store: string) {
    this.http.post("http://localhost:8000/addDeliveryDetails",{ zip, flat, street, city,state, store})
        .subscribe((responseData) => {
            console.log(responseData);
        });
        this.reloadCurrentRoute();
        //window.location.href = window.location.href;
        //location.reload(); 
    }
    deleteDeliveryDetails(deliveryId: string) {
        this.http.delete("http://localhost:8000/deleteDeliveryDetails/" + deliveryId)
            .subscribe(() => {
                console.log('Deleted: ' + deliveryId);
            });
            this.reloadCurrentRoute();
            //window.location.href = window.location.href;
            //location.reload();
    }
    updateDeliveryDetails(deliveryId: string,zip: string, flat: string, street: string, city: string, state: string, store: string) {
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/updateDeliveryDetails/" + 
        deliveryId,{ zip, flat, street, city,state, store})
        .subscribe(() => {
            console.log('Updated: ' + deliveryId);
            //this.ngOnInit();
        });
        //window.location.href = window.location.href;
        //location.reload();
        this.reloadCurrentRoute();
    }
    

    // Uses http.get() to load data 
    getDeliveryDetail(deliveryId: string) {
        return this.http.get("http://localhost:8000/deliveryDetails/"+deliveryId);
    }

    
    reloadCurrentRoute() {
        this.router.navigate([this.router.url])
    }
    
            
}