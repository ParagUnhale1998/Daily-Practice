import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopDestinationComponent } from './components/top-destination/top-destination.component';
import { TrendingComponent } from './components/trending/trending.component';



@NgModule({
  declarations: [
    SearchComponent,
    BookingComponent,
    ProfileComponent,
    HomeComponent,
    TopDestinationComponent,
    TrendingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
