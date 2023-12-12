import { Component } from '@angular/core';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSidenavOpen = false;


  constructor(private sharedService: HotelService) {}

  ngOnInit() {
    this.sharedService.isSidenavOpen$.subscribe(isOpen => {
      this.isSidenavOpen = isOpen;
    });
  }
  
  toggleSidenav() {
    this.sharedService.toggleSidenav();
    this.sharedService.isSidenavOpen$.subscribe(isOpen => {
      this.isSidenavOpen = isOpen;
    });
  }
}
