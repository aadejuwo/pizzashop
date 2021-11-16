import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, Validators, FormArray  } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'delivery-module',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
@Input() zip: string = "";
@Input() flat: string = "";
@Input() street: string = "";
@Input() city: string = "";
@Input() state: string = "";
@Input() store: string = "";

  public pickUp:boolean = false;
  public online:boolean = true;
  public mode = 'Add'; //default mode
  private id: any; //project ID
  private delivery: any;
  //public buttonName:any = 'Show';
  // pickUp=true;
  // delivery=true;

  pickUpToggle() {
    this.pickUp = !this.pickUp;
    if(this.pickUp)  
      this.online = false;
  }

  deliveryToggle() {
    this.online = !this.online;
    if(this.online)  
      this.pickUp = false;
  }
  

  deliveryForm = this.fb.group({
    zip: ['', Validators.required],
      flat:['', Validators.required],
      street:['', Validators.required],
      city: ['', Validators.required],
      state:['', Validators.required],
      store:['', Validators.required]

    // projectDescription: this.fb.group({
    //   description: ['', Validators.required],
    //   background: ['', Validators.required],
    //   problemStmnt: ['', Validators.required],
    //   objectives: ['', Validators.required]
    // }),
    // aliases: this.fb.array([
    //   this.fb.control('')
    // ])
  });

  get aliases() {
    return this.deliveryForm.get('aliases') as FormArray;
  }
  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder, private _deliveryService: DeliveryService, private router:Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id'))
          { 
          this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');
           //request student info based on the id
           this._deliveryService.getDeliveryDetail(this.id).subscribe(
            data => { 
                //read data and assign to private variable student
                this.delivery = data;
                //populate the firstName and lastName on the page
                //notice that this is done through the two-way bindings
                this.zip = this.delivery.zip;
                this.flat = this.delivery.flat;
                this.street = this.delivery.street;
                this.city = this.delivery.city;
                this.state = this.delivery.state;
                this.store = this.delivery.store;                                
            },
            err => console.error(err),
            () => console.log('finished loading')
        );
    } 
      else {this.mode = 'Add';
          this.id = null; }
  });
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("You submitted: " + this.zip + " " + this.flat+ " " + this.street+ " " + this.city+" "+this.state+" "+this.store);
    if (this.mode == 'Add')
      this._deliveryService.addDeliveryDetails(this.zip,this.flat,this.street,this.city, this.state, this.store);
    if (this.mode == 'Edit')
      this._deliveryService.updateDeliveryDetails(this.id,this.zip,this.flat,this.street,this.city, this.state, this.store);
    this.router.navigate(['/listDeliveryDetails']);
  }


// zip: any = {
//   "Kennesaw": ["30144", "30152" ],
//   "Marietta":[ "30060", "30061", "30062", "30063", "30064", "30065", "30066", "30067", "30068", "30069" ],
//   "Woodstock":[ "30188", "30189" ]
// };

zip2: any = {
  "30144": ["Kennesaw", "Marietta" ],
  //"30060":[ "Cumming", "Roswell", "30062", "30063", "30064", "30065", "30066", "30067", "30068", "30069" ],
  "30060":[ "Cumming", "Roswell" ]
};



getCity = (theCurrentZip: any) => {
  return this.zip2[theCurrentZip];
}

onKeyUp(event: any){
    this.deliveryForm.patchValue({
      store: this.getCity(event.target.value)
    })
  }
  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Nancy',
  //     address: {
  //       street: '123 Drew Street'
  //     }
  //   });
  // }
}
