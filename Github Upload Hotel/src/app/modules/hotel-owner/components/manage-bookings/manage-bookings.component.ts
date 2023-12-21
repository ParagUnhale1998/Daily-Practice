import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../services/hotel.service';
import { BookingsService } from '../../services/bookings.service';
import { OwnerDataService } from '../../services/owner-data.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phoneNumber', 'rooms', 'dateCheckIn', 'dateCheckOut', 'totalPrice', 'hotelName', 'actions'];
  dataSource!: MatTableDataSource<any>;//userdata

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingsService: BookingsService,private ownerDataService:OwnerDataService) {
    // Fetch your hotel data from the service
    const ownerId =this.ownerDataService.getOwnerId();

    this.bookingsService.getBookingsByOwner(ownerId).subscribe((bookings:any) => {
      this.dataSource = new MatTableDataSource(bookings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBooking(booking: any) {
    console.log('Edit booking:', booking);
    // Implement your edit logic here
  }

  deleteBooking(booking: any) {
    console.log('Delete booking:', booking);
    // Implement your delete logic here
  }
}

