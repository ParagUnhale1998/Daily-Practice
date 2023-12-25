import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  isRoomsDropdownOpen = false;
  rooms: number = 1;
  adults: number = 2;
  children: number = 0;

  toggleRoomsDropdown() {
    this.isRoomsDropdownOpen = !this.isRoomsDropdownOpen;
  }
  dateCheckIn: Date | undefined;
  dateCheckOut: Date | undefined;

  isUserRegistered = false;

  constructor(private router: Router) {
    // Get today's date
    const today: Date = new Date();

    // Assign the today's date to your variables
    this.dateCheckIn = today;
    this.dateCheckOut = today;
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

  SearchHotel(searchValue:any){
    this.router.navigate(['user/allhotels'], {
      queryParams: {searchValue: searchValue },
    });
  }
}
