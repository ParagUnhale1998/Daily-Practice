import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelOwnerRoutingModule } from './hotel-owner-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddHotelComponent,
    ManageBookingsComponent
  ],
  imports: [
    CommonModule,
    HotelOwnerRoutingModule
  ]
})
export class HotelOwnerModule { }
