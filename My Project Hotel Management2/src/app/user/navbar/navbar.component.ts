import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  userIsRegister: boolean = false;
  constructor(   private service: UserService, private router: Router){
  
  }
  ngOnInit(): void {
    this.userIsRegister = this.service.getUserIsRegister()
  }
  navigateToHome(){
 this.router.navigateByUrl('')
  }
  navigateToLogin(){
    this.router.navigateByUrl('user/login')

  }
  navigateToBusinessHome(){
    this.router.navigateByUrl('owner')

  }
  logout(){
            this.service.setUserIsRegister(false);
            this.userIsRegister = this.service.getUserIsRegister()
            this.router.navigateByUrl('')
  }
}
