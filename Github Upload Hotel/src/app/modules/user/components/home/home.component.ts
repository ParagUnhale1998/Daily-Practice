import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormGroup, FormControl} from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

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


constructor(private modalService: NgbModal,private router:Router){
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


testimonials: any | undefined;

responsiveOptions: any[] | undefined;

ngOnInit() {
    this.testimonials = [
        {
            name: 'Jessica Brown',
            position: 'Client',
            quote: 'This is the 3rd time I’ve used the website, and their services are always reliable. It only takes a few minutes to plan and finalize.',
            image: 'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg'
        },
        {
            name: 'Augusta Silva',
            position: 'Client',
            quote: 'I highly recommend this service. It made my travel planning so much easier and efficient.',
            image: 'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg'
        },
        {
            name: 'Ali Tufan',
            position: 'Client',
            quote: 'The website is user-friendly, and the team provides excellent support. Planning my trips is a breeze now.',
            image: 'https://mytravel.madrasthemes.com/wp-content/uploads/2022/02/img1-avatar.jpeg'
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
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}

// openBackDropCustomClass() {
//   const modalRef = this.modalService.open(ExampleModalComponent, {
//     backdropClass: 'custom-backdrop', // Add your custom backdrop class here
//     centered: true, // You can adjust other modal options as needed
//   });
//   modalRef.componentInstance.title = 'Modal Title';
//   modalRef.componentInstance.content = 'This is the modal content.';
// }
// openBackDropCustomClass() {
//   const modalRef = this.modalService.open(LoginComponent, {
//     backdropClass: 'transparent-black-backdrop',
//     centered: true,
//     size: 'md'
//   });
  
//   modalRef.result.then(
//     (result) => {
//       console.log('Modal closed with result:', result);
//     },
//     (reason) => {
//       console.log('Modal dismissed with reason:', reason);
//     }
//   );
// }
openBackDropCustomClass(){
  this.router.navigateByUrl('/user/login');
}
navigateToHotels() {
  this.router.navigateByUrl('/user/allhotels');
}
}

