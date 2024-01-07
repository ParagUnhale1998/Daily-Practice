import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit{
 bookingData:any
 userID:any

  constructor(private bookingService:BookingsService,private dataService:DataSharingService){
   this.userID =  this.dataService.userEmail
  }
  ngOnInit(): void {
    this.bookingService.getBookingsforUser(this.userID).subscribe({
      next: (data) => {
        this.bookingData = data;
        // console.log(data);
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    });
  }
  
}
/*import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  bookingData: any;
  userID: any;

  constructor(private bookingService: BookingsService, private dataService: DataSharingService) {
    this.userID = this.dataService.userEmail;
  }

  ngOnInit(): void {
    this.loadUserBookings();
  }

  private loadUserBookings(): void {
    this.bookingService.getBookingsforUser(this.userID).subscribe(
      (data) => {
        this.bookingData = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        // Handle error, show a message to the user, or redirect
      }
    );
  }
}
*/