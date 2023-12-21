import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsDataService } from '../../services/hotels-data.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-allhotels',
  templateUrl: './allhotels.component.html',
  styleUrls: ['./allhotels.component.scss']
})
export class AllhotelsComponent implements OnInit{
 
selectedRating: number | null = null;
allHotels: any;
isUserRegistered = false;
filteredHotels: any[] = [];
selectedFilter: string = 'all';
searchInput :string = ''
isSearching: boolean = false;


constructor(private route:ActivatedRoute, private router: Router,private hotelsDataService: HotelsDataService,private dataSharing:DataSharingService){

  this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
    this.isUserRegistered = isRegistered;
  });
}

ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {
   this.searchInput = params['searchValue'];
   this.updateSearchStatus()
  })
  this.loadAllHotels();

}

loadAllHotels() {
  this.hotelsDataService.getAllHotels().subscribe(data => {
    this.allHotels = data;
    // Initially, set filteredHotels to allHotels
    this.filteredHotels = [...this.allHotels];
  });
}

addToCart(hotel:any){
  this.router.navigate(['user/cart'], {
    queryParams: {hotelId: hotel.id },
  });
}

NavigateToLogin(){
  this.router.navigateByUrl('/user/login')

}
navigateToBooking(hotel:any){
  this.router.navigate(['user/hotelDetails'], {
    queryParams: {hotelId: hotel.id },
  });
}

onRatingChange(event: any) {
  this.selectedRating = event.value;
  this.filteredHotels = this.allHotels.filter((hotel:any) => hotel.rating >= this.selectedRating!);
}

onFilterChange() {

  if (this.selectedFilter === 'latest') {
    this.filteredHotels = this.filteredHotels.sort((a, b) => b.id - a.id);

  } else if (this.selectedFilter === 'priceLowToHigh') {
    this.filteredHotels = this.filteredHotels.sort((a, b) => a.price - b.price);

  } else if (this.selectedFilter === 'priceHighToLow') {
    this.filteredHotels = this.filteredHotels.sort((a, b) => b.price - a.price);

  } else if(this.selectedFilter === 'all') {
    this.filteredHotels = [...this.allHotels];
  }else{
    this.filteredHotels = [...this.allHotels];

  }
}
updateSearchStatus() {
  // Set isSearching based on whether there is text in the search input
  this.isSearching = !!this.searchInput.trim();
}

SearchHotels() {
  // this.updateSearchStatus()
  //   this.filteredHotels = this.allHotels.filter((hotel: any) => {
  //     return JSON.stringify(hotel).toLowerCase().includes(this.searchInput.toLowerCase());
  //   });
  }
  
//   resetSearch() {
//     this.selectedFilter = 'all';

// }

  

}