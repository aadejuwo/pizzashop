import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray  } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pizzashop-payment',
  templateUrl: './pizzashop-payment.component.html',
  styleUrls: ['./pizzashop-payment.component.css']
})
export class PizzashopPaymentComponent implements OnInit {
@Input() CardNumber: string = "";
@Input() Month: string = "";
@Input() Year: string = "";
@Input() Cvv: string = "";
@Input() NameOnCard: string = "";
@Input() Street: string = "";
@Input() Zip: string = "";
@Input() City: string = "";
@Input() State: string = "";

  profileForm = this.fb.group({
    CardNumber: ['', Validators.required],
    Month:['', Validators.required],
    Year:['', Validators.required],
    Cvv: ['', Validators.required],
    NameOnCard:['', Validators.required],
    Street:['', Validators.required],
    Zip: ['', Validators.required],
    City:['', Validators.required],
    State:['', Validators.required]
  });
  // profileForm = new FormGroup({
  //   CardNumber: new FormControl(''),
  //   Month: new FormControl(''),
  //   Year: new FormControl(''),
  //   Cvv: new FormControl(''),
  //   NameOnCard: new FormControl(''),
  //  // BillingAddress: new FormGroup({
  //     Street: new FormControl(''),
  //     Zip: new FormControl(''),
  //     City: new FormControl(''),
  //     State: new FormControl('')
  //  // })
  // });
  public mode = 'Add'; //default mode
  private id: any; //payment ID
  private payment:any;

  constructor(private fb: FormBuilder,private _myService: PaymentService, private router:Router,
  public route: ActivatedRoute) { }
 

ngOnInit() {
this.route.paramMap.subscribe((paramMap: ParamMap ) => {
  if (paramMap.has('_id')){ 
      this.mode = 'Edit'; /*request had a parameter _id */ 
      this.id = paramMap.get('_id');

       //request student info based on the id
       this._myService.getPayment(this.id).subscribe(
        data => { 
            //read data and assign to private variable payment
            this.payment = data;
            //populate the form on the page
            //notice that this is done through the two-way bindings
            // this.profileForm.get('CardNumber')?.setValue(this.payment.CardNumber);
            // this.profileForm.get('Month')?.setValue(this.payment.Month);
            // this.profileForm.get('Year')?.setValue(this.payment.Year);
            // this.profileForm.get('Cvv')?.setValue(this.payment.Cvv);
            // this.profileForm.get('NameOnCard')?.setValue(this.payment.NameOnCard);
            // this.profileForm.get('BillingAddress')?.get('Street')?.setValue(this.payment.Street);
            // this.profileForm.get('BillingAddress')?.get('Zip')?.setValue(this.payment.Zip);
            // this.profileForm.get('BillingAddress')?.get('City')?.setValue(this.payment.City);
            // this.profileForm.get('BillingAddress')?.get('State')?.setValue(this.payment.State);
            this.CardNumber=this.payment.CardNumber;
            this.Month=this.payment.Month;
            this.Year=this.payment.Year;
            this.Cvv=this.payment.Cvv;
            this.NameOnCard=this.payment.NameOnCard;
            this.Street=this.payment.Street;
            this.Zip=this.payment.Zip;
            this.City=this.payment.City;
            this.State=this.payment.State;


        },
        err => console.error(err),
        () => console.log('finished loading')
    );
    }
  else {
    this.mode = 'Add';
    this.id =  paramMap.get('cartId');
  }
});
}
  
  getCityByZip(){
    let zip = this.profileForm.get('BillingAddress')?.get('Zip')?.value
    let city:string= "";
    let state:string= "";

    if(zip == "30144" || zip == "30152"){
      city = "Kennesaw";
      state = "GA";
    }else if(zip == "30060" || zip =="30061" || zip == "30062" || zip == "30063" || zip =="30064" || zip=="30065" || zip =="30066" || zip== "30067"||zip=="30068" ||zip=="30069"){
      city = "Marietta";
      state = "GA";
    }else if(zip == "30188"|| zip=="30189"){
      city = "Woodstock"
      state = "GA";
    }else if(zip == "30319" || zip =="30327" || zip == "30328" || zip == "30338" || zip =="30339" || zip=="30342" || zip =="30350" || zip== "30358"||zip=="31150" ||zip=="31156"){
      city = "Sandy Springs";
      state = "GA";
    }else if(zip == "27260" || zip =="27261" || zip == "27262" || zip == "27263" || zip =="27264" || zip=="27265" || zip =="27268"){
      city = "High Point";
      state = "NC";
    }else if(zip == "27284"|| zip=="27285"){
      city = "Kernersville"
      state = "NC";
    }

    
  this.profileForm.get('BillingAddress')?.get('City')?.setValue(city)
  this.profileForm.get('BillingAddress')?.get('State')?.setValue(state)
}

onSubmit() {
  // let CardNumber = this.profileForm.get('CardNumber')?.value;
  // let Month = this.profileForm.get('Month')?.value;
  // let Year = this.profileForm.get('Year')?.value;
  // let Cvv = this.profileForm.get('Cvv')?.value;
  // let NameOnCard = this.profileForm.get('NameOnCard')?.value;
  // let Street = this.profileForm.get('BillingAddress')?.get('Street')?.value;
  // let Zip = this.profileForm.get('BillingAddress')?.get('Zip')?.value;
  // let City = this.profileForm.get('BillingAddress')?.get('City')?.value;
  // let State = this.profileForm.get('BillingAddress')?.get('State')?.value;

  console.log("You submitted: "+ this.profileForm.value);

  if(this.mode == 'Add'){
    this._myService.addPayment(
      this.id,
      this.CardNumber,
      this.Month,
      this.Year,
      this.Cvv,
      this.NameOnCard,
      this.Street,
      this.Zip,
      this.City,
      this.State
    );

    this.router.navigate(['/listPayments']);
  }
  
  if (this.mode == 'Edit'){
    this._myService.updatePayment(
      this.id,
      this.CardNumber,
      this.Month,
      this.Year,
      this.Cvv,
      this.NameOnCard,
      this.Street,
      this.Zip,
      this.City,
      this.State
    );

    this.router.navigate(['/listPayments']);
  }
  
}

}


