import { Component, OnInit } from '@angular/core';
import { HotelsDataService } from '../../services/hotels-data.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  allHotels: any;
  tourData: any;
  activityData: any;
  selectedCategory: string | null = null;
  randomHotels: any;
  isUserRegistered = false;

  constructor(
    private hotelsDataService: HotelsDataService,
    private router: Router,
    private dataSharing: DataSharingService
  ) {
    this.selectedCategory = 'hotel';
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  ngOnInit(): void {
    this.hotelsDataService.getAllHotels().subscribe({
      next: (data) => {
        this.allHotels = data;
        // Create a copy of allHotels
        this.randomHotels = [...data];
        this.sortRandomHotels();
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching all hotels:', error);
        // Handle error as needed
      },
    });

    this.getTourData();
    this.getActivityData();
  }

  showData(category: string): void {
    this.selectedCategory = category;

    if (category === 'rental') {
      this.sortRandomHotels();
    } else if (category === 'tours') {
      if (!this.tourData) {
        this.getTourData();
      }
    } else if (category === 'activity') {
      if (!this.activityData) {
        this.getActivityData();
      }
    } else {
      // Handle other categories if needed
    }
  }

  private getTourData() {
    this.hotelsDataService.getFakeTourData().subscribe({
      next: (data) => {
        this.tourData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching tour data:', error);
        // Handle error as needed
      },
    });
  }

  private getActivityData() {
    this.hotelsDataService.getFakeActivityData().subscribe({
      next: (data) => {
        this.activityData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching activity data:', error);
        // Handle error as needed
      },
    });
  }

  private sortRandomHotels() {
    // Create a copy of allHotels before shuffling
    this.randomHotels = [...this.allHotels];
    this.shuffleArray(this.randomHotels);
  }

  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  addToCart(hotel: any): void {
    this.router.navigate(['user/cart'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/user/login');
  }

  navigateToBooking(hotel: any): void {
    this.router.navigate(['user/hotelDetails'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  navigateToHotel(): void {
    this.router.navigateByUrl('/user/allhotels');
  }
}
/*import { Component, OnInit } from '@angular/core';
import { HotelsDataService } from '../../services/hotels-data.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  allHotels: any;
  tourData: any;
  activityData: any;
  selectedCategory: string = 'hotel';
  randomHotels: any;
  isUserRegistered = false;

  constructor(
    private hotelsDataService: HotelsDataService,
    private router: Router,
    private dataSharing: DataSharingService
  ) {}

  ngOnInit(): void {
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });

    this.hotelsDataService.getAllHotels().subscribe((data) => {
      this.allHotels = data;
      this.randomHotels = [...data];
      this.shuffleArray(this.randomHotels);
    });

    this.getTourData();
    this.getActivityData();
  }

  showData(category: string): void {
    this.selectedCategory = category;

    if (category === 'rental') {
      this.shuffleArray(this.randomHotels);
    } else if (category === 'tours') {
      // this.tourData = this.tourData || [];
      // this.getTourData();
    } else if (category === 'activity') {
      // this.activityData = this.activityData || [];
      // this.getActivityData();
    } else {
      // Handle other categories if needed
    }
  }

  private getTourData(): void {
    this.hotelsDataService.getFakeTourData().subscribe((data) => {
      this.tourData = data;
    });
  }

  private getActivityData(): void {
    this.hotelsDataService.getFakeActivityData().subscribe((data) => {
      this.activityData = data;
    });
  }

  private shuffleArray(array: any[]): void {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  addToCart(hotel: any): void {
    this.router.navigate(['user/cart'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/user/login');
  }

  navigateToBooking(hotel: any): void {
    this.router.navigate(['user/hotelDetails'], {
      queryParams: { hotelId: hotel.id },
    });
  }

  navigateToHotel(): void {
    this.router.navigateByUrl('/user/allhotels');
  }
}
*/
