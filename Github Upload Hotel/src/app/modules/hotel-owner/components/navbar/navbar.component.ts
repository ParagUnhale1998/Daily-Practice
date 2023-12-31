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
/*import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private isSidenavOpen = false;
  private subscription: Subscription;

  constructor(private sharedService: HotelService) {}

  ngOnInit() {
    this.subscription = this.sharedService.isSidenavOpen$.subscribe(isOpen => {
      this.isSidenavOpen = isOpen;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSidenav() {
    this.sharedService.toggleSidenav();
  }
}
*/