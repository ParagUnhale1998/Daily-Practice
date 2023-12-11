import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allhotels',
  templateUrl: './allhotels.component.html',
  styleUrls: ['./allhotels.component.scss']
})
export class AllhotelsComponent {
  rangeValues: number[] = [20,80];
    
  checkboxStatus:any = {
    popularity: false,
    guestRating: false,
    latest: false,
    priceLowToHigh: false,
    priceHightToLow: false,
    // Add other checkbox statuses here
};

  toggleCheckbox(checkbox: string): void {
    this.checkboxStatus[checkbox] = !this.checkboxStatus[checkbox];
}

selectedRating: number | null = null;

onRatingChange(event: any): void {
  this.selectedRating = event.value;
  // Implement your logic to filter hotels based on the selected rating
}

constructor(private router: Router){
  
}
}
