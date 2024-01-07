import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HotelService } from '../../services/hotel.service';
import { OwnerDataService } from '../../services/owner-data.service';
import { Router } from '@angular/router';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'image',
    'price',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>; //userdata
  ownerId!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private hotelService: HotelService,
    private ownerDataService: OwnerDataService,
    private router: Router,
    private tosterService: TosterMessageService
  ) {
    // Get the user data from the service
    this.ownerId = this.ownerDataService.getOwnerId();
    this.fetchHotels();

    // Fetch hotels for the specific owner
    // this.hotelService.getHotelsForOwner(this.ownerId).subscribe((hotels) => {
    //   this.dataSource = new MatTableDataSource(hotels);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  fetchHotels() {
    of(this.ownerDataService.getOwnerId()).pipe(
      switchMap((ownerId) => this.hotelService.getHotelsForOwner(ownerId)),
      tap((hotels) => {
        this.dataSource = new MatTableDataSource(hotels);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      catchError((error) => {
        // Handle errors, log or display a message
        console.error('Error fetching hotels:', error);
        return of([]); // Returning an empty array as a default value or handle errors accordingly
      })
    ).subscribe();
  }
/*Explanation:

switchMap: Switch to a new observable (your hotel fetching operation) whenever the owner ID changes. It cancels the previous subscription if a new owner ID is emitted.

tap: Perform side effects, like updating the data source, paginator, and sort after successfully fetching hotels.

catchError: Handle errors gracefully. In this case, it returns an empty array and logs the error. You can customize this based on your error handling strategy.

of: Wrap the getOwnerId result in an observable to use it in the pipe sequence

*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editHotel(hotel: any) {
    // Implement your edit logic here
    this.router.navigate([
      '/owner/add-hotel',
      { mode: 'edit', hotelId: hotel.id },
    ]);
  }

  deleteHotel(hotel: any) {
    // Implement your delete logic here
    console.log('Delete hotel:', hotel);

    // Call the deleteHotel method from your HotelService
    this.hotelService.deleteHotel(hotel.id, this.ownerId).subscribe({
      next: () => {
        console.log('Hotel deleted successfully');
        this.tosterService.showSuccess(
          'Hotel Deleted',
          'The hotel has been deleted successfully.'
        );

        // Fetch the updated list of hotels for the owner
        this.hotelService
          .getHotelsForOwner(this.ownerId)
          .subscribe((updatedHotels) => {
            // Update the dataSource with the new list of hotels
            this.dataSource.data = updatedHotels;

            // Optionally, you can update your local data or perform other actions after deletion
          });
      },
      error: (error) => {
        this.tosterService.showError(
          'Error Deleting Hotel',
          'An error occurred while deleting the hotel.'
        );

        console.error('Error deleting hotel', error);
      },
    });
  }
}
