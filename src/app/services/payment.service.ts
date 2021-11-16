import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PaymentService {

    constructor(private http:HttpClient) {}
  
    // Uses http.get() to load data based on payment id
    getPayment(paymentId: string) {
        return this.http.get('http://localhost:8000/pizzashops/'+ paymentId); 
    }
    //uses http.get() to load data 
    getPayments() {
        return this.http.get('http://localhost:8000/pizzashops/');
    }

    //Uses http.post() to post data 
    addPayment(
        cartId: string,
        CardNumber : string, 
        Month : string,
        Year : string,
        Cvv :string,
        NameOnCard: string,
        Street : string,
        Zip : string,
        City : string,
        State : string,
        ) {
        this.http.post('http://localhost:8000/pizzashops/',{ 
        cartId,
        CardNumber,
        Month,
        Year,
        Cvv,
        NameOnCard,
        Street,
        Zip,
        City,
        State,
     })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
    }    

    deletePayment(paymentId: string) {
        this.http.delete("http://localhost:8000/pizzashops/" + paymentId)
            .subscribe(() => {
                console.log('Deleted: ' + paymentId);
            });
    }   
    
    updatePayment(
        paymentId:string,
        CardNumber : string, 
        Month : string,
        Year : string,
        Cvv :string,
        NameOnCard: string,
        Street : string,
        Zip : string,
        City : string,
        State : string,
    ) 
    {
        this.http.put("http://localhost:8000/pizzashops/"+ paymentId,
        { 
            CardNumber,
            Month,
            Year,
            Cvv,
            NameOnCard, 
            Street,
            Zip,
            City, 
            State
         })
        .subscribe(() => {
            console.log('Updated: ' + paymentId);
        });
    } 
 }
