import { Component, OnInit } from '@angular/core';
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
