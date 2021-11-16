// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryComponent } from './delivery-module/delivery.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { PizzashopPaymentComponent } from './pizzashop-payment/pizzashop-payment.component';

// const routes: Routes = [
//   {
//     path: 'delivery',
//     component: DeliveryComponent,
//     // children: [
//     //   {
//     //     path: 'pickUp', // child route path
//     //     component: ChildAComponent, // child route component that the router renders
//     //   },
//     //   {
//     //     path: 'onlineDelivery',
//     //     component: ChildBComponent, // another child route component that the router renders
//     //   },
//     // ],
//     },
//     {
//     path: 'foodMenu',
//     component: FoodMenuComponent,
//     },
//     {
//       path: 'payment',
//       component: PizzashopPaymentComponent,
//     },
//     {
//     path: '',
//     component: DashboardComponent,
//     },
// ];

// @NgModule({
// imports: [
// RouterModule.forRoot(routes)
// ],
// exports: [
// RouterModule
// ],
// declarations: []
// })
// export class AppRoutingModule { }
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
