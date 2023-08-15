import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OwnerhomeComponent } from './ownerhome/ownerhome.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {  OwnerLoginComponent } from './login/login.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component';
import { MyHotelsComponent } from './my-hotels/my-hotels.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
const routes: Routes = [
  // { path: '', component: OwnerhomeComponent },
  { path: '', component: PartnerWithUsComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: OwnerLoginComponent },
  { path: 'addHotel', component: AddHotelComponent },
  { path: 'partnerWithUs', component: PartnerWithUsComponent },
  { path: 'myHotels', component: MyHotelsComponent },
  { path: 'myBookings', component: MyBookingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
