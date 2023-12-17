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
