import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { OMService } from 'src/app/services/OM.service';
import {  FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

public mode = 'Add'; //default mode
private id: any; //item ID
private item: any;
//public items: any;
   //declare variable to hold response and make it public to be accessible from components.html
   //public items: any;
   //initialize the call using StudentService 
   constructor(private fb: FormBuilder, private _myService: ItemService,private _myOMService: OMService, private router:Router, public route: ActivatedRoute) { }
   
   public items : any = [];
   public grandTotal !: number;
   //constructor(private cartService : CartService) { }
 
  
   removeItem(item: any){
     this._myOMService.removeCartItem(item);
   }
   emptycart(){
     this._myOMService.removeAllCart();
   }
    //method called OnInit
  //   getCartItems() {
  //     this._myOMService.getCartItems().subscribe(
  //         //read data and assign to public variable items
  //         data => { this.items = data},
  //         err => console.error(err),
  //         () => console.log('finished loading')
  //     );
  // }
 
   ngOnInit() {
       //this.getCartItems();
      this._myOMService.getProducts()
     .subscribe(res=>{
       this.items = res;
       this.grandTotal = this._myOMService.getTotalPrice();
     })
      //  this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //   if (paramMap.has('_id')) {
      //     this.mode = 'Edit'; /*request had a parameter _id */
      //     this.id = paramMap.get('_id');
      //     //request profile info based on the id
      //     this._myOMService.getCartItem(this.id).subscribe(
      //       data => {
      //         //read data and assign to private variable student
      //         this.item = data;
      //         //populate the form on the page
      //         //notice that this is done through the two-way bindings
      //         this.OrderManagement.get('Pizza')?.setValue(this.item.Pizza);
      //         this.OrderManagement.get('Breads')?.setValue(this.item.Breads);
      //         this.OrderManagement.get('Drinks')?.setValue(this.item.Drinks);
      //         this.OrderManagement.get('Desserts')?.setValue(this.item.Desserts);
      //         this.OrderManagement.get('Crust')?.setValue(this.item.Crust);
      //         this.OrderManagement.get('Pepperoni')?.setValue(this.item.Pepperoni);
      //         this.OrderManagement.get('ExtraCheese')?.setValue(this.item.ExtraCheese);
      //         this.OrderManagement.get('Olives')?.setValue(this.item.Olives);
  
      //       },
      //       err => console.error(err),
      //       () => console.log('finished loading')
      //     );
      //   }
      //   else {
      //     this.mode = 'Add';
      //     this.id = null;
      //   }
      // });
   }
  
   onDelete(itemId: string) {
     this._myOMService.deleteCartItems(itemId);
     this.router.navigate(['/listCartItems']);
 }
//  OrderManagement = this.fb.group({
//     Pizza: false,
//     Breads: false,
//     Drinks: false,
//     Desserts: false,
//     Crust: [''],
//     Pepperoni: false,
//     ExtraCheese: false,
//     Olives: false,

//   });

 onSubmit() {
   let cartId =1;
    // TODO: Use Eventemitter with form value
    // let Pizza = this.OrderManagement.get("Pizza")?.value ? 'Pizza' : '';
    // // let pizza1= (<HTMLInputElement>document.getElementById("pizza")).value?'pizza1':'';
    // /*if(Pizza===true)
    // {Pizza='Pizza'}
    // else{Pizza = ''};*/
    // // console.log(Pizza + "this is the value of pizza")
    // let Breads = this.OrderManagement.get('Breads')?.value ? 'Breads' : '';
    // let Drinks = this.OrderManagement.get('Drinks')?.value ? 'Drinks' : '';
    // let Desserts = this.OrderManagement.get('Desserts')?.value ? 'Desserts' : '';
    // let Crust = this.OrderManagement.get('Crust')?.value;
    // console.log(Crust + "this is the value of crust");

    // let Pepperoni = this.OrderManagement.get('Pepperoni')?.value ? 'Pepperoni' : '';
    // let ExtraCheese = this.OrderManagement.get('ExtraCheese')?.value ? 'ExtraCheese' : '';
    // let Olives = this.OrderManagement.get('Olives')?.value ? 'Olives' : '';

    // console.log("You submitted: " + this.OrderManagement.value);
    // let items = [{
    //     Pizza,
    //       Breads,
    //       Drinks,
    //       Desserts,
    //       Crust,
    //       Pepperoni,
    //       ExtraCheese,
    //       Olives
    //   }]
    // if (this.mode == 'Add') {
    //   this._myOMService.addCartItems(cartId,
    //     items

    //   );
    // }
    // if (this.mode == 'Edit') {
    //   this._myOMService.UpdateItems(
    //     this.id,
    //     items

    //   );
    // }


    this.router.navigate(['/addPayment/'+cartId]);


  }

}
