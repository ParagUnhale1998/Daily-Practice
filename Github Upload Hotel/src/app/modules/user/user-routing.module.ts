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
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'allhotels', component: AllhotelsComponent },
  { path: 'hotelDetails', component: HotelDetailsComponent ,canActivate:[userGuard]  },
  { path: 'cart', component: CartComponent ,canActivate:[userGuard] },
  { path: 'myBookings', component: MyBookingsComponent ,canActivate:[userGuard] },
  { path: 'contactUs', component: ContactUSComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: '**', redirectTo: '' }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
