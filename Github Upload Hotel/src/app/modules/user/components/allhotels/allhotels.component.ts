import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsDataService } from '../../services/hotels-data.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-allhotels',
  templateUrl: './allhotels.component.html',
  styleUrls: ['./allhotels.component.scss'],
})
export class AllhotelsComponent implements OnInit {
  selectedRating: number | null = null;
  allHotels: any[] = [];
  isUserRegistered = false;
  filteredHotels: any[] = [];
  selectedFilter = 'all';
  searchInput = '';
  isSearching = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelsDataService: HotelsDataService,
    private dataSharing: DataSharingService,
  ) {
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchInput = params['searchValue'] || '';
      this.updateSearchStatus();
    });
    this.loadAllHotels();
  }
  loadAllHotels(): void {
    this.isLoading = true;
    
    this.hotelsDataService.getAllHotels().pipe(
      catchError(error => {
        console.error('Error loading hotels:', error);
        // Handle the error, show a message to the user, or redirect
        return EMPTY; // Return an empty observable to continue the stream
      }),
      finalize(() => {
        this.isLoading = false; // Ensure loading indicator is turned off, even in case of an error
      })
    ).subscribe(data => {
      this.allHotels = data || [];
      // Initially, set filteredHotels to allHotels
      this.filteredHotels = [...this.allHotels];
    });
  }

  addToCart(hotel: any): void {
    this.router.navigate(['user/cart'], {
      queryParams: { hotelId: hotel?.id },
    });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/user/login');
  }

  navigateToBooking(hotel: any): void {
    this.router.navigate(['user/hotelDetails'], {
      queryParams: { hotelId: hotel?.id },
    });
  }


  onRatingChange(event: any): void {
    this.selectedRating = event?.value;
    this.filteredHotels = this.allHotels.filter(
      (hotel) => hotel.rating >= this.selectedRating!
    );
  }

  onFilterChange(): void {
    switch (this.selectedFilter) {
      case 'latest':
        this.filteredHotels = this.filteredHotels.sort((a, b) => b.id - a.id);
        break;
      case 'priceLowToHigh':
        this.filteredHotels = this.filteredHotels.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.filteredHotels = this.filteredHotels.sort((a, b) => b.price - a.price);
        break;
      case 'all':
        this.filteredHotels = [...this.allHotels];
        break;
      default:
        this.filteredHotels = [...this.allHotels];
    }
  }

  updateSearchStatus(): void {
    if (this.searchInput && this.searchInput.trim() !== '') {
      this.isSearching = true;
    } else {
      this.isSearching = false;
    }
  }

  SearchHotels() : void{}
}

/*selectedRating: number | null = null;
  allHotels: any;
  isUserRegistered = false;
  filteredHotels: any[] = [];
  selectedFilter: string = 'all';
  searchInput: string = '';
  isSearching: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelsDataService: HotelsDataService,
    private dataSharing: DataSharingService,
  ) {
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchInput = params['searchValue'];
      this.updateSearchStatus();
    });
    this.loadAllHotels();
  }

  loadAllHotels() {
    this.hotelsDataService.getAllHotels().subscribe((data) => {
      this.allHotels = data;
      // Initially, set filteredHotels to allHotels
      this.filteredHotels = [...this.allHotels];
      this.isLoading = false;
    });
  }

  addToCart(hotel: any) {
    this.router.navigate(['user/cart'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  NavigateToLogin() {
    this.router.navigateByUrl('/user/login');
  }
  navigateToBooking(hotel: any) {
    this.router.navigate(['user/hotelDetails'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  onRatingChange(event: any) {
    this.selectedRating = event.value;
    this.filteredHotels = this.allHotels.filter(
      (hotel: any) => hotel.rating >= this.selectedRating!
    );
  }

  onFilterChange() {
    if (this.selectedFilter === 'latest') {
      this.filteredHotels = this.filteredHotels.sort((a, b) => b.id - a.id);
    } else if (this.selectedFilter === 'priceLowToHigh') {
      this.filteredHotels = this.filteredHotels.sort(
        (a, b) => a.price - b.price
      );
    } else if (this.selectedFilter === 'priceHighToLow') {
      this.filteredHotels = this.filteredHotels.sort(
        (a, b) => b.price - a.price
      );
    } else if (this.selectedFilter === 'all') {
      this.filteredHotels = [...this.allHotels];
    } else {
      this.filteredHotels = [...this.allHotels];
    }
  }

  updateSearchStatus() {
    if (this.searchInput && this.searchInput.trim() !== '') {
      this.isSearching = true;
    } else {
      this.isSearching = false;
    }
  }

  SearchHotels() {}
}*/