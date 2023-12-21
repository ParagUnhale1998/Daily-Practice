import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../services/hotel.service';
import { OwnerDataService } from '../../services/owner-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  displayedColumns: string[] = ['id', 'name','location','image','price','actions'];
  dataSource!: MatTableDataSource<any>;//userdata
  ownerId!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hotelService: HotelService, private ownerDataService: OwnerDataService,private router :Router) {
    // Get the user data from the service
    const userData = this.ownerDataService.getUserData();
    console.log('hotel list'+ userData.id)
    if (userData) {
      // Set the owner ID
      this.ownerId = userData.id;

      // Fetch hotels for the specific owner
      this.hotelService.getHotelsForOwner(this.ownerId).subscribe((hotels) => {
        this.dataSource = new MatTableDataSource(hotels);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      // Handle the case when user data is not available (e.g., not logged in)
      console.error('User data not available');
    }
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
    this.router.navigate(['/owner/add-hotel', { mode: 'edit', hotelId: hotel.id }]);

    console.log('Edit hotel:', hotel);
  }
  
  deleteHotel(hotel: any) {
    // Implement your delete logic here
    console.log('Delete hotel:', hotel);
  
    // Call the deleteHotel method from your HotelService
    this.hotelService.deleteHotel(hotel.id, this.ownerId).subscribe(
      () => {
        console.log('Hotel deleted successfully');

         // Fetch the updated list of hotels for the owner
      this.hotelService.getHotelsForOwner(this.ownerId).subscribe((updatedHotels) => {
        // Update the dataSource with the new list of hotels
        this.dataSource.data = updatedHotels;
        
        // Optionally, you can update your local data or perform other actions after deletion
      });
      },
      (error) => {
        console.error('Error deleting hotel', error);
      }
    );
  }
  
}