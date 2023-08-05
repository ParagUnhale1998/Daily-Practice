import { Component, OnInit } from '@angular/core';
import {  Navigation, Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isOwner = false;
  ownerType!: string;
  currentRoute!: string;

  constructor(private router: Router,private commonService: CommonService) {}
 
  ngOnInit(): void {
    const currentSnapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.currentRoute = currentSnapshot.url;
 console.log(this.currentRoute)
 this.ownerType = this.currentRoute;
 
  }
  journey(journey: String) {
    if (journey === 'admin') {
      this.commonService.jurney = 'admin';
      this.ownerType = 'admin'
      this.router.navigateByUrl('admin');
     
    } else if (journey === 'owner') {
      this.commonService.jurney = 'owner';
      this.ownerType = 'owner'
      this.router.navigateByUrl('owner');
    } 
    else if (journey === this.ownerType + '/login') {
    
      this.commonService.jurney = this.ownerType + '/login';

      this.router.navigateByUrl(this.ownerType + '/login');
    }
    else {
      this.commonService.jurney = 'user';
      this.ownerType = 'user'
      this.router.navigateByUrl('user');
    }
  }
  
  isLogin = "main";


  ngDoCheck(): void {
    let login = this.router.url;
    console.log(login) // console is the part of node and browser not javascript
    if (login === '/admin/home' || login === '/admin/owners' || login === '/admin/hotels' || login === '/admin/users') {
      this.isLogin = 'admin'
    } else if (login === '/owner/home') {
      this.isLogin = 'owner'
    } else if (login === '/user/home') {
      this.isLogin = 'user'
    } else {
      this.isLogin = 'main'
    }
  }
}
