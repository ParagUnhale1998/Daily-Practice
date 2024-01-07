import { Component, OnInit } from '@angular/core';
import { OwnerDataService } from '../../services/owner-data.service';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ownerId: string = '';
  totalHotels: number = 0;
  totalBookings: number = 0;
  todayDate: string = '';

  constructor(private ownerDataService:OwnerDataService,private hotelServices:HotelService){
    this.ownerId = this.ownerDataService.getOwnerId();

  }
  ngOnInit(): void {
    this.hotelServices.getHotelsForOwner(this.ownerId).subscribe((hotels) => {
      this.totalHotels = hotels.length;
    });

    this.hotelServices.getBookingsForOwner(this.ownerId).subscribe((bookings) => {
      this.totalBookings = bookings.length;
    });

    // Get today's date
    this.todayDate = this.getCurrentDate();
  }
  private getCurrentDate(): string {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' };
    return today.toLocaleDateString('en-US');
  }
  
  
}
/*import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerDataService } from '../../services/owner-data.service';
import { HotelService } from '../../services/hotel.service';
import { Subscription } from 'rxjs';

const DEFAULT_TIMEZONE = 'Asia/Kolkata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private ownerId: string = '';
  totalHotels = 0;
  totalBookings = 0;
  todayDate: string = '';
  private subscriptions: Subscription[] = [];

  constructor(private ownerDataService: OwnerDataService, private hotelService: HotelService) {
    this.ownerId = this.ownerDataService.getOwnerId();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.hotelService.getHotelsForOwner(this.ownerId).subscribe(
        hotels => this.totalHotels = hotels.length,
        error => this.handleError('Error fetching hotels', error)
      )
    );

    this.subscriptions.push(
      this.hotelService.getBookingsForOwner(this.ownerId).subscribe(
        bookings => this.totalBookings = bookings.length,
        error => this.handleError('Error fetching bookings', error)
      )
    );

    // Get today's date
    this.todayDate = this.getCurrentDate();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getCurrentDate(): string {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: DEFAULT_TIMEZONE };
    return today.toLocaleDateString('en-US', options);
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    // Implement additional error handling or logging here
  }
}
*/