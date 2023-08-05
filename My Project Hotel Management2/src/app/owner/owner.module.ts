import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerhomeComponent } from './ownerhome/ownerhome.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OwnerLoginComponent } from './login/login.component';
import { MaterialModule } from '../shared/material/material.module';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component';
import { MyHotelsComponent } from './my-hotels/my-hotels.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    OwnerhomeComponent,
    SignUpComponent,
    OwnerLoginComponent,
    AddHotelComponent,
    PartnerWithUsComponent,
    MyHotelsComponent,
    MyBookingsComponent,

  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OwnerModule { }
