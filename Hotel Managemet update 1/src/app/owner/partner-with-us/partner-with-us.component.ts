import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-partner-with-us',
  templateUrl: './partner-with-us.component.html',
  styleUrls: ['./partner-with-us.component.scss']
})
export class PartnerWithUsComponent {
  constructor(private router:Router,private service:OwnerService,private dialog: MatDialog){}
  
  ownerIsRegister:boolean = this.service.getOwnerIsRegister()
  // ownerIsRegister:boolean =true

  navigateToAddHotel(): void {
    if (this.ownerIsRegister) {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.position = { top: '100px', left: '50%', right: 'auto', bottom: 'auto' };
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = { editMode: false };
      const dialogRef = this.dialog.open(AddHotelComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });

    } else {
      this.router.navigateByUrl('signUp');
    }
  }
  navigateToHotel(){
    this.service.setActiveButton('myHotels');
    this.router.navigateByUrl('myHotels')
  }
  // navigateToHome(){
  //   if (this.ownerIsRegister) {
  //   this.router.navigateByUrl('partnerWithUs')
  //   }
  //   else{
  //     this.router.navigateByUrl('/user')
  //   }
  // }
  // navigateToLogin(){
  //   this.router.navigateByUrl('signUp')

  // }
 
  // navigateTOBooking(){
  //   this.router.navigateByUrl('myBookings')
  // }
  // navigateToLogout(){
  //   this.service.ownerID = ''
  //   console.log(this.service.ownerID)
  //   this.service.setOwnerIsRegister(false);
  //   this.router.navigateByUrl('/user')
  // }
}
