import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OMService } from '../services/OM.service';
import {default as menu} from '../menu.json';


// interface IMenu<T> {
//   name: string;
//   value?: T
// }
//const menu = require('../menu.json');
@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})


export class FoodMenuComponent implements OnInit {

  
  public productList :any;
  public list = menu;
  public filterCategory : any
  //searchKey:string ="";
  constructor( private cartService : OMService) { }

  ngOnInit(): void {
    // this.api.getProduct()
    // .subscribe(res=>{
      this.productList = this.list;
      this.filterCategory = this.list;
      this.productList.forEach((a:any) => {

        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)

  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }


}

  /*@Input() pizza: Boolean= false;
  @Input() Breads: Boolean=false;
  @Input() Drinks: Boolean=false;
  @Input() Desserts: Boolean=false;
  */
  // public mode = 'Add'; //default mode
  // private id: any; //item ID
  // private item: any;

  // foodMenu: FormGroup;
  // data = [];


  // constructor(private fb: FormBuilder, private _myService: ItemService, private _myOMService: OMService,
  //   private router: Router, public route: ActivatedRoute) { 
  //     this.foodMenu = fb.group({
  //       items: fb.group({
  //         checkboxes: this.fb.array([]),
  //       })
  
  //     });
  //   }
  //   ngOnInit() {
  //     const foodItems: IMenu<boolean>[] = [
  //       { value: false, name: "Pizza" },
  //       { value: false, name: "Breads" },
  //       { value: false, name: "Drinks" },
  //       { value: false, name: "Desserts" },
  //       { value: false, name: "Crust" },
  //       { value: false, name: "Pepperoni" },
  //       { value: false, name: "ExtraCheese" },
  //       { value: false, name: "Olives" }
  //     ]
  //     this.updateFoodMenu(foodItems)
  
  //   }
  
  //   updateFoodMenu(items: IMenu<any>[]) {
  //     this.data = items;
  //     const foodMenu = this.foodMenu.get('items').get('checkboxes') as FormArray;
  //     for (const i of items) {
  //       foodMenu.push(this.fb.control(i.value))
  //     }
  //   }

  // ngOnInit() {
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has('_id')) {
  //       this.mode = 'Edit'; /*request had a parameter _id */
  //       this.id = paramMap.get('_id');
  //       //request profile info based on the id
  //       this._myOMService.getCartItem(this.id).subscribe(
  //         data => {
  //           //read data and assign to private variable student
  //           this.item = data;
  //           //populate the form on the page
  //           //notice that this is done through the two-way bindings
  //           this.FoodMenu.get('Pizza')?.setValue(this.item.Pizza);
  //           this.FoodMenu.get('Breads')?.setValue(this.item.Breads);
  //           this.FoodMenu.get('Drinks')?.setValue(this.item.Drinks);
  //           this.FoodMenu.get('Desserts')?.setValue(this.item.Desserts);
  //           this.FoodMenu.get('Crust')?.setValue(this.item.Crust);
  //           this.FoodMenu.get('Pepperoni')?.setValue(this.item.Pepperoni);
  //           this.FoodMenu.get('ExtraCheese')?.setValue(this.item.ExtraCheese);
  //           this.FoodMenu.get('Olives')?.setValue(this.item.Olives);

  //         },
  //         err => console.error(err),
  //         () => console.log('finished loading')
  //       );
  //     }
  //     else {
  //       this.mode = 'Add';
  //       this.id = null;
  //     }
  //   });
  // }
  // FoodMenu = this.fb.group({
    
  //   Pizza: false,
  //   Breads: false,
  //   Drinks: false,
  //   Desserts: false,
  //   Crust: [''],
  //   Pepperoni: false,
  //   ExtraCheese: false,
  //   Olives: false,
    

  // });
//   addtocart(item: any){
//     if (this.mode == 'Add') {
//       this._myOMService.addtoCart(item);
//     }
//     if (this.mode == 'Edit') {
//       this._myOMService.UpdateItems(
//         this.id,
//         item
//       );
//     }
//     this.router.navigate(['/listItems']);

//   }

//   // onSubmit() {
    
//   //   // TODO: Use Eventemitter with form value
//   //   let Pizza = this.foodMenu.get("Pizza")?.value ? 'Pizza' : '';
//   //   // let pizza1= (<HTMLInputElement>document.getElementById("pizza")).value?'pizza1':'';
//   //   /*if(Pizza===true)
//   //   {Pizza='Pizza'}
//   //   else{Pizza = ''};*/
//   //   // console.log(Pizza + "this is the value of pizza")
//   //   let Breads = this.foodMenu.get('Breads')?.value ? 'Breads' : '';
//   //   let Drinks = this.foodMenu.get('Drinks')?.value ? 'Drinks' : '';
//   //   let Desserts = this.foodMenu.get('Desserts')?.value ? 'Desserts' : '';
//   //   let Crust = this.foodMenu.get('Crust')?.value;
//   //   console.log(Crust + "this is the value of crust");

//   //   let Pepperoni = this.foodMenu.get('Pepperoni')?.value ? 'Pepperoni' : '';
//   //   let ExtraCheese = this.foodMenu.get('ExtraCheese')?.value ? 'ExtraCheese' : '';
//   //   let Olives = this.foodMenu.get('Olives')?.value ? 'Olives' : '';
//   //   // for( let itemArr: any ) {


//   //   // }
//   //   let items = [{
//   //     Pizza,
//   //       Breads,
//   //       Drinks,
//   //       Desserts,
//   //       Crust,
//   //       Pepperoni,
//   //       ExtraCheese,
//   //       Olives
//   //   }]
//   //   console.log("You submitted: " + this.foodMenu.value);

//   //   if (this.mode == 'Add') {
//   //     this._myOMService.addCartItems(
//   //       items
//   //     );
//   //   }
//   //   if (this.mode == 'Edit') {
//   //     this._myOMService.UpdateItems(
//   //       this.id,
//   //       items
//   //     );
//   //   }


//   //   this.router.navigate(['/listItems']);


//   // }

// }

