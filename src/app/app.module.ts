import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryComponent } from './delivery-module/delivery.component';
import { UnlessDirective } from './unless.directive';
import { OrderManagementComponent } from './order-management/order-management.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodMenuComponent  } from './food-menu/food-menu.component';
// import { PickUpComponent } from './delivery-module/pick-up/pick-up.component';
// import { OnlineDeliveryComponent } from './delivery-module/online-delivery/online-delivery.component';
import { PizzashopPaymentComponent } from './pizzashop-payment/pizzashop-payment.component';
import { ListPaymentsComponent } from './list/list-payments/list-payments.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { PaymentService } from './services/payment.service';
import { DeliveryService } from './services/delivery.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//import { StudentService } from './student.service';
//import { NewStudentFormComponent } from './new-student-form/new-student-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ListDeliveryComponent } from './list/list-delivery/list-delivery.component';
import { ListItemsComponent } from './list/list-items/list-items.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgmCoreModule } from '@agm/core';
import { ItemService } from './services/item.service';
import { OMService } from './services/OM.service';

const appRoutes: Routes = [ {
  path: 'addPayment/:cartId',
  component: PizzashopPaymentComponent
},
{
  path: 'listPayments',
  component: ListPaymentsComponent
},
{
  path: 'editPayment/:_id',
  component: PizzashopPaymentComponent
},
{
  path: 'addDeliveryDetails',
  component: DeliveryComponent
},
{
  path: 'listDeliveryDetails',
  component: ListDeliveryComponent
},
{
  path: 'editDeliveryDetails/:_id',
  component: DeliveryComponent
},
{ 
  path: 'addItems', 
  component: FoodMenuComponent 
},
{ 
  path: 'editItem/:_id',
  component: FoodMenuComponent 
},
{ 
  path: 'listItems', 
  component: ListItemsComponent 
},
{ 
  path: 'getCartItems', 
  component: OrderManagementComponent 
}
// { 
//   path: '**', 
//   component: NotFoundComponent 
// }
];


@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    UnlessDirective,
    OrderManagementComponent,
    //DashboardComponent,
    FoodMenuComponent,
    PizzashopPaymentComponent,
    ListPaymentsComponent,
    NavigationMenuComponent,
    ListDeliveryComponent,
    ListItemsComponent,
    NotFoundComponent,
    //OrderManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhGEZrvuXADZDhoqBYLovHaPG84RmS3p0'
    }),
    
  ],
  providers: [PaymentService, DeliveryService, ItemService, OMService/* , MenuService, OMservice],*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
