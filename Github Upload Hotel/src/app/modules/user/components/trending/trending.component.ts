import { Component, OnInit } from '@angular/core';
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
  TourData: any;
  activityData: any;
  selectedCategory: string | null = null;
  RandomHotels: any;
  isUserRegistered = false;

  constructor(private hotelsDataService: HotelsDataService,private router:Router,private dataSharing:DataSharingService) {
    this.selectedCategory = 'hotel';
    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  ngOnInit(): void {
    this.hotelsDataService.getAllHotels().subscribe(data => {
      this.allHotels = data;
      // Create a copy of allHotels
      this.RandomHotels = [...data];
      this.sortRandomHotels()
      console.log(data);
      
    });
    this.getTourData()
    this.getActivityData()
  }

  showData(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'rental') {
      this.sortRandomHotels();
    } else if (category === 'tours') {
      // this.TourData = this.TourData || [];

      // this.getTourData()
    }else if(category === 'activity'){
      // this.activityData = this.activityData || [];

      // this.getActivityData()
    }else{
      // Handle other categories if needed
    }
  }
  
  private getTourData(){
    this.hotelsDataService.getFakeTourData().subscribe(data => {
      this.TourData = data;
      console.log(data);
    });
  }
  private getActivityData(){
    this.hotelsDataService.getFakeActivityData().subscribe(data => {
      this.activityData = data;
      console.log(data);
    });
  }

  private sortLatestHotels() {
    // Create a copy of allHotels and then sort
    this.allHotels = [...this.allHotels.sort((a: any, b: any) => b.id - a.id)];
  }

  private sortRandomHotels() {
    // Create a copy of allHotels before shuffling
    this.RandomHotels = [...this.allHotels];
    this.shuffleArray(this.RandomHotels);
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
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
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
}
