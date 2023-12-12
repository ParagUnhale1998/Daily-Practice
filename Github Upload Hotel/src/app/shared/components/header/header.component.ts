import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDropdownOpen = false;



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  constructor(private router: Router){
    
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
}
