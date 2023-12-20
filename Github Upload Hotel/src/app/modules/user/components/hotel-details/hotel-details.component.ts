import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  
  hotelId: any;
  hotelData: any;
  isRoomsDropdownOpen = false;

  toggleRoomsDropdown() {
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
  constructor(private route: ActivatedRoute,private hotelService:HotelService) {
    // Get today's date
   
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
