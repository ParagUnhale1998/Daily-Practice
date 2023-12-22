import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataSharingService } from 'src/app/modules/user/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDropdownOpen = false;
  isUserRegistered = false;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor(private router: Router,private dataSharing:DataSharingService,private translate: TranslateService){
    translate.setDefaultLang('en');

    this.dataSharing.userIsRegistered$.subscribe((isRegistered) => {
      this.isUserRegistered = isRegistered;
    });
  }

  switchLanguage() {
    const currentLang = this.translate.currentLang;
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    this.translate.use(newLang);
  }
  
  navigateTohome(){
    this.router.navigateByUrl('/user')
  }
  navigateToHotels(){
    this.router.navigateByUrl('/user/allhotels')

  }
  navigateToLogin(){
    this.router.navigateByUrl('/user/login')

  }
  navigateToOwnerLogin() {
    this.router.navigateByUrl('/owner/login');
  }
  navigateToCart(){
    this.router.navigateByUrl('/user/cart');

  }
  navigateToBookings(){
    this.router.navigateByUrl('/user/myBookings');
  }
  logout(){
    this.router.navigateByUrl('/user')
    this.dataSharing.setUserRegistrationState(false)
    this.dataSharing.userEmail=''
  }
}
