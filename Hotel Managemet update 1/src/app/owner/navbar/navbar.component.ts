import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  activeButton: string = '';
  ownerIsRegister!:boolean;
  constructor(private router:Router,private service:OwnerService){

   
  }

  // ownerIsRegister:boolean = this.service.getOwnerIsRegister()

  ngOnInit(): void {
    this.ownerIsRegister = this.service.getOwnerIsRegister()
    this.service.activeButton$.subscribe(button => {
      this.activeButton = button;
      console.log(this.activeButton)
    });
  }
  navigateToLogin(){
  
    this.router.navigateByUrl('signUp')

  }
  navigateToHome(){
    if (this.ownerIsRegister) {
      this.service.setActiveButton('Home');
      this.router.navigateByUrl('partnerWithUs')
    }
    else{
      this.service.setActiveButton('Home');
      this.router.navigateByUrl('/user')
    }
  }
  navigateToHotel(){
    this.service.setActiveButton('myHotels');
    this.router.navigateByUrl('myHotels')
  }
  navigateTOBooking(){
    this.service.setActiveButton('myBookings');
    this.router.navigateByUrl('myBookings')
  }
  navigateToLogout(){
    this.service.ownerID = ''
    // console.log(this.service.ownerID)
    this.service.setOwnerIsRegister(false);
    this.router.navigateByUrl('/user')
  }


}
