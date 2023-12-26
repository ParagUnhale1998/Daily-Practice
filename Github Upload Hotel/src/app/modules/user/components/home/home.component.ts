import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
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

  constructor(private router: Router, private dataSharing: DataSharingService,private loadingService: LoadingService) {
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

  activeIndex: number = 0;

  testimonials: any | undefined;

  responsiveOptions: any[] | undefined;

  ngOnInit() {
   

    this.testimonials = [
      {
        name: 'Jessica Brown',
        position: 'Client',
        quote:
          'This is the 3rd time I’ve used the website, and their services are always reliable. It only takes a few minutes to plan and finalize.',
        image:
          'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg',
      },
      {
        name: 'Augusta Silva',
        position: 'Client',
        quote:
          'I highly recommend this service. It made my travel planning so much easier and efficient.',
        image:
          'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg',
      },
      {
        name: 'Ali Tufan',
        position: 'Client',
        quote:
          'The website is user-friendly, and the team provides excellent support. Planning my trips is a breeze now.',
        image:
          'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg',
      },
      // Add more testimonials as needed
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }
 
  SearchHotel(searchValue:any){
    this.router.navigate(['user/allhotels'], {
      queryParams: {searchValue: searchValue },
    });
  }
}
