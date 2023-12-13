import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent {
  displayedColumns: string[] = ['id', 'name','location','image','price','actions'];
  dataSource!: MatTableDataSource<any>;//userdata

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hotelService: HotelService) {
    // Fetch your hotel data from the service
    this.hotelService.getHotels().subscribe((hotels) => {
      console.log(hotels)
      this.dataSource = new MatTableDataSource(hotels);
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

  editHotel(hotel: any) {
    // Implement your edit logic here
    console.log('Edit hotel:', hotel);
  }
  
  deleteHotel(hotel: any) {
    // Implement your delete logic here
    console.log('Delete hotel:', hotel);
  }
}

