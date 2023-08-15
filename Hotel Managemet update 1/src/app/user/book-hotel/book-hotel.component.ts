import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.scss'],
})
export class BookHotelComponent implements OnInit{
  bookHotelForm!: FormGroup;
  paymentMethods = ['Net-Banking', 'UPI', 'QR'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.bookingForm()
  }
 
  bookingForm(){
    this.bookHotelForm = this.fb.group({
      ownerID: [this.data.ownerId],
      hotelID: [this.data.hotelID],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bookingDate: [null, Validators.required],
      bookingExitDate: [null, Validators.required],
      paymentMethod: ['', Validators.required],
      guests: ['', Validators.required],
      rooms: ['', Validators.required],
    });
  }

  bookHotel() {
    if (this.bookHotelForm.valid) {
      const endpoint = 'Allbookings';
      console.log('Form data submitted valid:', this.bookHotelForm.value);
      this.userService.BookHotel(endpoint, this.bookHotelForm.value).subscribe({
        next : (res) => {
          console.log('booking Data' + res);
          this.snackBar.open('Hotel Register Success', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          this.dialogRef.close();

        },
        error : (error) => {
          console.error('Error booking hotel:', error);
          this.snackBar.open('An error occurred while booking hotel', 'Dismiss', {
            duration: 3000, //
            panelClass: 'success-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
        }
      
      });
      // this.dialogRef.close();
    } 

    else {
      console.log('Please enter valid data');
      this.snackBar.open('Please enter valid data', 'Dismiss', {
        duration: 3000, //
        panelClass: 'success-snackbar',
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
