import { Component } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {

  
  selectedCategory: string | null = null;
 
  constructor(){
    this.selectedCategory = 'hotel'

  }

  showData(category: string): void {
      this.selectedCategory = category;
  }
}
