import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../owner.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent {
  /*fullName phone email bookingDate bookingExitDate paymentMethod guests rooms */
  displayedColumns: string[] = [
    'id',
    'hotelID',
    'fullName',
    'phone',
    'email',
    'bookingDate',
    'bookingExitDate',
    'paymentMethod',
    'guests',
    'rooms',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private service: OwnerService) {}

  ngOnInit(): void {
    this.getBookingsList();
  }

  getBookingsList() {
    const ownerId = this.service.ownerID; //'paragunhale123'
    this.service.getAllBookings().subscribe({
      next: (res: any) => {
        const filteredData = res.filter(
          (booking: any) => booking.ownerID === ownerId
        );
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(filteredData);
      },
      error: (err: any) => void console.log(err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBookings(id: any) {
    this.service.deleteAllBooking(id).subscribe((res) => {
      console.log('Booking deleted successfully.');
      this.getBookingsList(); // Refresh the bookings after deletion
    });
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
}
