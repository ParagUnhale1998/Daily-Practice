import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { hotelOwnerGuard } from './guards/hotel-owner.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent ,canActivate: [hotelOwnerGuard]},
      // { path: 'dashbord', component: DashboardComponent },
      { path: 'all-hotels', component: HotelListComponent ,canActivate: [hotelOwnerGuard] },
      { path: 'add-hotel', component: AddHotelComponent ,canActivate: [hotelOwnerGuard]},
      { path: 'add-hotel/:mode/:hotelId', component: AddHotelComponent,canActivate: [hotelOwnerGuard] },
      { path: 'booking-list', component: ManageBookingsComponent ,canActivate: [hotelOwnerGuard]},
      
    ],
    
  },

  // { path: '', component: DashboardComponent, pathMatch: 'full' },
  // { path: 'dashbord', component: DashboardComponent },
  // { path: 'hotel-list', component: HotelListComponent },
  // { path: 'add-hotel', component: AddHotelComponent },
  // { path: 'booking-list', component: ManageBookingsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelOwnerRoutingModule {}
