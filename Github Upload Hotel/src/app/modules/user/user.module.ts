import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopDestinationComponent } from './components/top-destination/top-destination.component';
import { TrendingComponent } from './components/trending/trending.component';
import { AllhotelsComponent } from './components/allhotels/allhotels.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SearchPipe } from './pipes/search.pipe';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';



@NgModule({
  declarations: [
    SearchComponent,
    BookingComponent,
    ProfileComponent,
    HomeComponent,
    TopDestinationComponent,
    TrendingComponent,
    AllhotelsComponent,
    LoginComponent,
    SignUpComponent,
    CartComponent,
    SearchPipe,
    HotelDetailsComponent,
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,

  ]
})
export class UserModule { }
