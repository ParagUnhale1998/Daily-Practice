import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HotelService } from '../../services/hotel.service';
import { OwnerDataService } from '../../services/owner-data.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isSidenavOpen = false;
  private subscription: Subscription;

  constructor(
    private sharedService: HotelService,
    private ownerDataServiec: OwnerDataService,
    private tosterService :TosterMessageService
  ) {
    this.subscription = this.sharedService.isSidenavOpen$.subscribe(
      (isOpen) => {
        this.isSidenavOpen = isOpen;
      }
    );
  }
  logout() {
    this.ownerDataServiec.logout();
    this.tosterService.showSuccess('Logout Successful', 'Goodbye! See you soon.');

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleSidenav(){
    this.sharedService.toggleSidenav()
  }
}
