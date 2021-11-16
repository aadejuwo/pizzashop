import { Component, OnInit } from '@angular/core';
import { OMService } from '../services/OM.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'order-management-module',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

public mode = 'Add'; //default mode
private id: any; //item ID
private item: any;
public items: any;

constructor(private fb: FormBuilder, private _myService: OMService,
  private router: Router, public route: ActivatedRoute) { }

//    //declare variable to hold response and make it public to be accessible from components.html
//    //initialize the call using StudentService 
//    constructor(private _myService: OMService) { }
 
   ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');
        //request profile info based on the id
        this._myService.getCartItem(this.id).subscribe(
          data => {
            //read data and assign to private variable student
            this.item = data;
            //populate the form on the page
            //notice that this is done through the two-way bindings
            this.OrderManagement.get('Pizza')?.setValue(this.item.Pizza);
            this.OrderManagement.get('Breads')?.setValue(this.item.Breads);
            this.OrderManagement.get('Drinks')?.setValue(this.item.Drinks);
            this.OrderManagement.get('Desserts')?.setValue(this.item.Desserts);
            this.OrderManagement.get('Crust')?.setValue(this.item.Crust);
            this.OrderManagement.get('Pepperoni')?.setValue(this.item.Pepperoni);
            this.OrderManagement.get('ExtraCheese')?.setValue(this.item.ExtraCheese);
            this.OrderManagement.get('Olives')?.setValue(this.item.Olives);

          },
          err => console.error(err),
          () => console.log('finished loading')
        );
      }
      else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }
   //method called OnInit
   getCartItems() {
       this._myService.getCartItems().subscribe(
           //read data and assign to public variable items
           data => { this.items = data},
           err => console.error(err),
           () => console.log('finished loading')
       );
   }
   onDelete(itemId: string) {
     this._myService.deleteCartItems(itemId);
 }

 OrderManagement = this.fb.group({
    Pizza: false,
    Breads: false,
    Drinks: false,
    Desserts: false,
    Crust: [''],
    Pepperoni: false,
    ExtraCheese: false,
    Olives: false,

  });

 onSubmit() {
    // TODO: Use Eventemitter with form value
    let Pizza = this.OrderManagement.get("Pizza")?.value ? 'Pizza' : '';
    // let pizza1= (<HTMLInputElement>document.getElementById("pizza")).value?'pizza1':'';
    /*if(Pizza===true)
    {Pizza='Pizza'}
    else{Pizza = ''};*/
    // console.log(Pizza + "this is the value of pizza")
    let Breads = this.OrderManagement.get('Breads')?.value ? 'Breads' : '';
    let Drinks = this.OrderManagement.get('Drinks')?.value ? 'Drinks' : '';
    let Desserts = this.OrderManagement.get('Desserts')?.value ? 'Desserts' : '';
    let Crust = this.OrderManagement.get('Crust')?.value;
    console.log(Crust + "this is the value of crust");

    let Pepperoni = this.OrderManagement.get('Pepperoni')?.value ? 'Pepperoni' : '';
    let ExtraCheese = this.OrderManagement.get('ExtraCheese')?.value ? 'ExtraCheese' : '';
    let Olives = this.OrderManagement.get('Olives')?.value ? 'Olives' : '';

    console.log("You submitted: " + this.OrderManagement.value);
    let items = [{
      Pizza,
        Breads,
        Drinks,
        Desserts,
        Crust,
        Pepperoni,
        ExtraCheese,
        Olives
    }]
    if (this.mode == 'Add') {
      this._myService.addCartItems(
        items

      );
    }
    if (this.mode == 'Edit') {
      this._myService.UpdateItems(
        this.id,
        items

      );
    }


    this.router.navigate(['/getCartItems']);


  }

}
