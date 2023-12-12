import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isSidenavOpen = false;
  private subscription: Subscription;

  constructor(private sharedService: HotelService) {
    this.subscription = this.sharedService.isSidenavOpen$.subscribe(isOpen => {
      this.isSidenavOpen = isOpen;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
