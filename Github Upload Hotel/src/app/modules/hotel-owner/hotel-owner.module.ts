import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelOwnerRoutingModule } from './hotel-owner-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddHotelComponent,
    ManageBookingsComponent,
    LoginComponent,
    SignupComponent,
    HotelListComponent,
    ProfileComponent,
    SidenavComponent,
    NavbarComponent,
    MainLayoutComponent,
  ],
  imports: [
    CommonModule,
    HotelOwnerRoutingModule,
    SharedModule,

  ],
  
})
export class HotelOwnerModule { }
