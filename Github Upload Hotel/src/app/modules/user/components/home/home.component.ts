import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isDropdownOpen = false;
  isRoomsDropdownOpen = false;
  rooms: number = 1;
  adults: number = 2;
  children: number = 0;
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleRoomsDropdown(){
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
  dateCheckIn: Date | undefined;
  dateCheckOut: Date | undefined;
constructor(){
  // Get today's date
const today: Date = new Date();

// Assign the today's date to your variables
this.dateCheckIn = today;
this.dateCheckOut = today;

this.selectedCategory = 'hotel'
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


activeIndex: number = 0;
selectedCategory: string | null = null;


showData(category: string): void {
    this.selectedCategory = category;
}
}
