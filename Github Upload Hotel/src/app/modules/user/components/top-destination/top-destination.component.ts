import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-destination',
  templateUrl: './top-destination.component.html',
  styleUrls: ['./top-destination.component.scss']
})
export class TopDestinationComponent {

  constructor(private router:Router){}


  searchHotel(searchValue:any){
    this.router.navigate(['user/allhotels'], {
      queryParams: {searchValue: searchValue },
    });
  }
}
