import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BookHotelComponent } from '../book-hotel/book-hotel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  userIsRegister: boolean = false;
  hotelListData!: any;
  searchInput:any;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {

    this.userService.userIsRegister$.subscribe((value) => {
      this.userIsRegister = value;

    });

      this.userService.getHotelList().subscribe((data) => {
        this.hotelListData = data;
        console.log(this.hotelListData);
      });
      
  }
  loginpage(){
    this.router.navigateByUrl('user/login')
  }

  bookNow(id:any,id2:any) {
    
    this.dialog.open(BookHotelComponent, {
      data:  { ownerId: id ,hotelID:id2},
     
    });
  }

}
