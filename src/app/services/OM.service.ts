import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable(
)
export class OMService {

    public cartItemList : any =[]
    public productList = new BehaviorSubject<any>([]);
    public search = new BehaviorSubject<string>("");

    constructor(private http: HttpClient) { } 

    getProducts(){
      return this.productList.asObservable();
    }
    setProduct(product : any){
        this.cartItemList.push(...product);
        this.productList.next(product);
      }
      addtoCart(product : any){
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log("this-->",this.cartItemList)
        //console.log("Price-->",this.getTotalPrice)
      }
      getTotalPrice() : number{
        let grandTotal = 0;
        this.cartItemList.map((a:any)=>{
          grandTotal += a.total;
        })
        console.log("price-->",grandTotal );
        return grandTotal;
      }
      removeCartItem(product: any){
        this.cartItemList.map((a:any, index:any)=>{
          if(product.id=== a.id){
            this.cartItemList.splice(index,1);
          }
        })
        this.productList.next(this.cartItemList);
      }
      removeAllCart(){
        this.cartItemList = []
        this.productList.next(this.cartItemList);
      }
    
      
deleteCartItems(orderId: string) {
    this.http.delete("http://localhost:8000/orders/" + orderId)
        .subscribe(() => {
            console.log('Deleted: ' + orderId);
        });
        location.reload();
}

//Uses http.get() to request data based on item id 
getCartItem(orderId: string) {
    return this.http.get('http://localhost:8000/orders/'+ orderId);
}

    // Uses http.get() to load data 
    getCartItems() {
        return this.http.get('http://localhost:8000/orders');
    }
    //Uses http.post() to post data 
    
    
    addCartItems(
        items: any

    ) {
        this.http.post('http://localhost:8000/orders', {
          items
        })
            .subscribe((responseData) => {
                console.log(responseData);
            });
            
    
    }
    UpdateItems(
        orderId: string,
        items: any

    )
    {

        this.http.put("http://localhost:8000/orders/" + orderId,
        {
            items

         })

        .subscribe(() => {

            console.log('Updated: ' + orderId);

        });

    }

}