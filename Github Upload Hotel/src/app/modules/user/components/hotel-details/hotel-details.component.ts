import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit{
  
  dateCheckIn: Date ;
  dateCheckOut: Date ;
  rooms: number = 1;
  adults: number = 2;
  children: number = 0;

  isRoomsDropdownOpen = false;

  toggleRoomsDropdown() {
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
  constructor(){
       // Get today's date
       const today: Date = new Date();

       // Assign the today's date to your variables
       this.dateCheckIn = today;
       this.dateCheckOut = today;
       console.log( this.dateCheckIn,this.dateCheckOut)
  }
  ngOnInit(): void {
    
  }

  incrementRooms() {
    this.rooms++;
  }

  decrementRooms() {
    if (this.rooms > 1) {
      this.rooms--;
    }
  }

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }

  incrementChildren() {
    this.children++;
  }

  decrementChildren() {
    if (this.children > 0) {
      this.children--;
    }
  }
}
