import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AllhotelsComponent } from './components/allhotels/allhotels.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ContactUSComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'allhotels', component: AllhotelsComponent },
  { path: 'hotelDetails', component: HotelDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'myBookings', component: MyBookingsComponent },
  { path: 'contactUs', component: ContactUSComponent },
  { path: 'aboutUs', component: AboutUsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
