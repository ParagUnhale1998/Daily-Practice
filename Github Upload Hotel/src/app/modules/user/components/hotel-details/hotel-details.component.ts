/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  
  hotelId: any;
  hotelData: any;
  isRoomsDropdownOpen = false;
  isUserRegistered = false;

  toggleRoomsDropdown() {
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
  constructor(private route: ActivatedRoute,private hotelService:HotelService,private dataSharing:DataSharingService) {
    // Get today's date
   
  this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
    this.isUserRegistered = isRegistered;
  });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const hotelId = params['hotelId'];
      this.hotelId = hotelId;
      this. getHotelData()
    })
   
    
  }

  getHotelData() {
    this.hotelService.getHotelById(this.hotelId).subscribe(data => {
      this.hotelData = data
    })
  }

  
}

*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  hotelId:any;
  hotelData: any;
  isRoomsDropdownOpen = false;
  isUserRegistered = false;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private dataSharing: DataSharingService
  ) {
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hotelId = params['hotelId'];
      this.getHotelData();
    });
  }

  getHotelData(): void {
    this.hotelService.getHotelById(this.hotelId)
      .pipe(
        catchError((error) => {
          // Handle the error, show a message, log, etc.
          console.error('Error fetching hotel data:', error);
          // Optionally, you can rethrow the error to propagate it to the subscriber
          return throwError('Failed to fetch hotel data. Please try again later.');
        })
      )
      .subscribe({
        next: (data) => {
          this.hotelData = data;
        }
      });
  }
  

  toggleRoomsDropdown() {
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
}

