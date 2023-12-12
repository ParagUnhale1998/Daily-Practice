import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      // { path: 'dashbord', component: DashboardComponent },
      { path: 'all-hotels', component: HotelListComponent },
      { path: 'add-hotel', component: AddHotelComponent },
      { path: 'booking-list', component: ManageBookingsComponent },
      
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
