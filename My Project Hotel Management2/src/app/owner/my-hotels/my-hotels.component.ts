import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddHotelComponent } from '../add-hotel/add-hotel.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-hotels',
  templateUrl: './my-hotels.component.html',
  styleUrls: ['./my-hotels.component.scss'],
})
export class MyHotelsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'hotelName',
    'star',
    'location',
    'price',
    'rooms',
    'discription',
    'phoneNo',
    'availability',
    'image',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private service: OwnerService,
    private dialog: MatDialog,
    private toastr: ToastrService,

  ) {}
  ownerIsRegister: boolean = this.service.getOwnerIsRegister();
  // ownerIsRegister:boolean =true

  hotelData: any;

  ngOnInit(): void {
    this.getOwnerData();
  }
  getOwnerData(): void {
    const ownerId = this.service.ownerID; //'paragunhale123'

    this.service.getOwnerData(ownerId).subscribe({
      next: (res: any) => {
        this.hotelData = res.hotels;
        this.dataSource = new MatTableDataSource(res.hotels);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('sortData' + res.hotels);
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToAddHotel(): void {
    if (this.ownerIsRegister) {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.position = { top: '100px', left: '50%', right: 'auto', bottom: 'auto' };
      dialogConfig.hasBackdrop = true;
      dialogConfig.data = { editMode: false,
        getHotelData:this.getOwnerData.bind(this)
        };

      const dialogRef = this.dialog.open(AddHotelComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        // Handle any actions after the dialog is closed if needed
        console.log('The dialog was closed', result);
      });
    } else {
      this.router.navigateByUrl('signUp');
    }
  }

  navigateToHome() {
    this.router.navigateByUrl('partnerWithUs');
  }
  navigateToHotel() {
    this.router.navigateByUrl('myHotels');
  }
  navigateTOBooking() {
    this.router.navigateByUrl('myBookings');
  }
  navigateToLogout() {
    this.service.ownerID = ''
    console.log(this.service.ownerID)

    this.service.setOwnerIsRegister(false);
    this.router.navigateByUrl('/user');
  }

  onEdit(hotel: any): void {
    this.dialog.open(AddHotelComponent, {
      data: { hotelData: hotel, editMode: true , getHotelData:this.getOwnerData.bind(this) },
      disableClose: true,
    });
  }
  onDelete(hotel: any) {
    if (hotel) {
      const hotelIndex = this.hotelData.findIndex(
        (h: any) => h.id === hotel.id
      );
      if (hotelIndex !== -1) {
        this.hotelData.splice(hotelIndex, 1); // Remove the hotel from the hotels array
      
        // console.log('Hotel Deleted', hotel);
        // console.log('Hotel Deleted:before' + hotel.id);
        this.deleteAllHotelData(hotel.id);
        // console.log('Hotel Deleted after:', hotel);
        this.service
          .deleteOwnerHotels(this.service.ownerID, this.hotelData)
          .subscribe(
            (updatedData) => {
              this.getOwnerData();
              console.log('Hotel Data Updated:', updatedData);
              this.toastr.success(`Hotel`, 'Deleted Successfully !!', {
                positionClass: 'toast-top-left',
                timeOut: 2000,
                closeButton: true,
              });
            },
            (error) => {console.error('Error Deleted hotel data:', error)
            this.toastr.error('Error Deleted Hotel Data', 'Failed Deleted', {
              positionClass: 'toast-top-right',
              timeOut: 2000,
              closeButton: true,
            });}
          );
      }
    }
  }

  deleteAllHotelData(id: any) {
    this.service
      .deleteAllHotelData(id)
      .subscribe((res) => console.log('allhotels hotel deleted' + res));
    this.getOwnerData();
  }
}
