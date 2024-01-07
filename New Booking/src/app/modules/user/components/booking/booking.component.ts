import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service';
import { BookingsService } from '../../services/bookings.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  @Input() hotelId!: number;
  @Input() hotelPrice!: number;

  dateCheckIn: Date;
  dateCheckOut: Date;
  rooms: number = 1;
  adults: number = 2;
  children: number = 0;

  numberOfNights!: number;
  pricePerNight!: number;
  longStayDiscount!: number;
  totalPriceBeforeTaxes!: number;
  hotelData: any;
  userID: any;

  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder,
    private userDataSharing: DataSharingService,
    private bookingService: BookingsService,
    private toster: TosterMessageService,
    private router: Router
  ) {
    const today: Date = new Date();
    this.dateCheckIn = today;
    console.log('Check-In Date:', this.dateCheckIn);
    this.dateCheckOut = new Date(this.dateCheckIn);
    this.dateCheckOut.setDate(this.dateCheckIn.getDate() + 1);
    console.log('Check-Out Date:', this.dateCheckOut);
    this.userID = this.userDataSharing.userEmail;
  }

  ngOnInit(): void {
    this.getHotelData();
    this.createBookingForm();
  }

  getHotelData(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        this.hotelData = data;
        console.log('Hotel Data:', this.hotelData);
        this.numberOfNights = this.getNumberOfNights();
        console.log('Number of Nights:', this.numberOfNights);
        this.pricePerNight = this.hotelData.price;
        console.log('Price Per Night:', this.pricePerNight);
        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error('Error fetching hotel data:', error);
        // Handle the error, show a message to the user, or redirect
      }
    });
  }

  createBookingForm() {
    this.bookingForm = this.fb.group({
      hotelId: [null],
      ownerId: [null],
      userId: [null],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], 
      rooms: [null, [Validators.required, Validators.min(1)]],
      adults: [null, [Validators.required, Validators.min(1)]],
      children: [null, [Validators.min(0)]],
      dateCheckIn: [null, [Validators.required]],
      dateCheckOut: [null, [Validators.required]],
      totalPrice: [null],
      nights: [null],
      hotelName: [null],
      hotelPrice: [null],
      hotelLocation: [null],
      hotelImage: [null],
    });
  }

  onSubmit() {
    this.bookingForm.get('hotelId')?.setValue(this.hotelId);
    this.bookingForm.get('ownerId')?.setValue(this.hotelData.ownerId);
    this.bookingForm.get('userId')?.setValue(this.userID);
    this.bookingForm.get('totalPrice')?.setValue(this.totalPriceBeforeTaxes);
    this.bookingForm.get('nights')?.setValue(this.numberOfNights);
    this.bookingForm.get('hotelName')?.setValue(this.hotelData.hotelName);
    this.bookingForm.get('hotelPrice')?.setValue(this.hotelData.price);
    this.bookingForm.get('hotelLocation')?.setValue(this.hotelData.hotelLocation);
    this.bookingForm.get('hotelImage')?.setValue(this.hotelData.image);
    this.bookingForm.get('rooms')?.setValue(this.rooms);
    this.bookingForm.get('adults')?.setValue(this.adults);
    this.bookingForm.get('children')?.setValue(this.children);
    this.bookingForm.get('dateCheckIn')?.setValue(this.dateCheckIn);
    this.bookingForm.get('dateCheckOut')?.setValue(this.dateCheckOut);
    if (this.bookingForm.valid) {
      // Form is valid, perform submission logic
      const formData = this.bookingForm.value;
    
      this.bookingService.createBooking(formData).subscribe({
        next: (response) => {
          this.toster.showSuccess('Booking Successful', 'Enjoy your stay!');
          setTimeout(() => {
            this.router.navigateByUrl('user/myBookings');
          }, 300);
          console.log('Booking created successfully:', response);
          this.bookingForm.reset();
          // Optionally, fetch updated booking list
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.toster.showError('Booking Failed', 'Please try again later.');
        }
      });
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.toster.showWarning(
        'Invalid Booking',
        'Please fill out all required fields.'
      );
    }
  }    

  incrementRooms() {
    this.rooms++;
    this.calculateTotalPrice();
  }

  decrementRooms() {
    if (this.rooms > 1) {
      this.rooms--;
      this.calculateTotalPrice();
    }
  }

  incrementAdults() {
    this.adults++;
    this.calculateTotalPrice();
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
      this.calculateTotalPrice();
    }
  }

  incrementChildren() {
    this.children++;
    this.calculateTotalPrice();
  }

  decrementChildren() {
    if (this.children > 0) {
      this.children--;
      this.calculateTotalPrice();
    }
  }

  onDateChange(): void {
    this.numberOfNights = this.getNumberOfNights();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    // Add discount for longer stay
    this.longStayDiscount = this.numberOfNights >= 7 ? 500 : 0;

    // Calculate total price
    let baseTotalPrice = this.rooms * this.pricePerNight * this.numberOfNights;

    let extraGuestCharge = Math.max(0, this.adults + this.children - 4) * 1000;

    let totalPrice = baseTotalPrice + extraGuestCharge;

    // Apply long stay discount
    totalPrice -= this.longStayDiscount;

    // Ensure the total price is not negative
    this.totalPriceBeforeTaxes = Math.max(0, totalPrice);

    console.log('Total Price:', this.totalPriceBeforeTaxes);
  }

  getNumberOfNights(): number {
    const timeDiff = this.dateCheckOut.getTime() - this.dateCheckIn.getTime();
    const nights = timeDiff / (1000 * 3600 * 24);
    return Math.ceil(nights);
  }
}
/* Using Rxjs
import { switchMap, catchError, startWith, finalize, retry, timeout, delay } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

// ...

if (this.bookingForm.valid) {
  // Form is valid, perform submission logic
  const formData = this.bookingForm.value;

  this.bookingService.createBooking(formData).pipe(
    startWith(null), // Start with null to trigger loading indicator
    switchMap(() => {
      // Inside switchMap, perform the actual booking request
      return this.bookingService.createBooking(formData).pipe(
        catchError((error) => {
          console.error('Error creating booking:', error);
          this.toster.showError('Booking Failed', 'Please try again later.');
          return EMPTY; // Return an empty observable to continue the stream
        }),
        retry(3), // Retry the request up to 3 times
        timeout(10000), // Set a timeout of 10 seconds
        delay(2000), // Introduce a delay of 2 seconds before completing the observable
        finalize(() => {
          // Ensure loading indicator is turned off, even in case of an error
          // This block will execute whether the request succeeds or fails
          this.isLoading = false;
        })
      );
    })
  ).subscribe({
    next: (response) => {
      this.toster.showSuccess('Booking Successful', 'Enjoy your stay!');
      setTimeout(() => {
        this.router.navigateByUrl('user/myBookings');
      }, 300);
      console.log('Booking created successfully:', response);
      this.bookingForm.reset();
      // Optionally, fetch updated booking list
    },
    error: () => {
      // Error handling is already done inside catchError
      // You can handle additional errors specific to this block if needed
    }
  });
} else {
  // Form is invalid, display error messages
  console.log('Form is invalid');
  this.toster.showWarning(
    'Invalid Booking',
    'Please fill out all required fields.'
  );
}
*/



/*bookingForm!: FormGroup;

  @Input() hotelId!: number;
  @Input() hotelPrice!: number;

  dateCheckIn: Date = new Date();
  dateCheckOut: Date = new Date();
  rooms: number = 1;
  adults: number = 2;
  children: number = 0;

  numberOfNights!: number;
  pricePerNight!: number;
  longStayDiscount!: number;
  totalPriceBeforeTaxes!: number;
  hotelData: any;
  userID: any;

  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder,
    private userDataSharing: DataSharingService,
    private bookingService: BookingsService,
    private toster: TosterMessageService,
    private router: Router
  ) {
    this.initializeDates();
    this.userID = this.userDataSharing.userEmail;
  }

  ngOnInit(): void {
    this.getHotelData();
    this.createBookingForm();
  }
  createBookingForm() {
  const formControls = {
    hotelId: [null],
    ownerId: [null],
    userId: [null],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]], // Add any specific validations for phone number
    rooms: [null, [Validators.required, Validators.min(1)]],
    adults: [null, [Validators.required, Validators.min(1)]],
    children: [null, [Validators.min(0)]],
    dateCheckIn: [null, [Validators.required]],
    dateCheckOut: [null, [Validators.required]],
    totalPrice: [null],
    nights: [null],
    hotelName: [null],
    hotelPrice: [null],
    hotelLocation: [null],
    hotelImage: [null],
  };

  this.bookingForm = this.fb.group(formControls);
}

onSubmit() {
  if (this.bookingForm.valid) {
    this.prepareFormValues();

    this.bookingService.createBooking(this.bookingForm.value).subscribe(
      () => this.handleBookingSuccess(),
      (error) => this.handleBookingError(error)
    );
  } else {
    this.handleInvalidForm();
  }
}

private prepareFormValues() {
  const form = this.bookingForm;
  form.get('hotelId')?.setValue(this.hotelId);
  form.get('ownerId')?.setValue(this.hotelData.ownerId);
  form.get('userId')?.setValue(this.userID);
  form.get('totalPrice')?.setValue(this.totalPriceBeforeTaxes);
  form.get('nights')?.setValue(this.numberOfNights);
  form.get('hotelName')?.setValue(this.hotelData.hotelName);
  form.get('hotelPrice')?.setValue(this.hotelData.price);
  form.get('hotelLocation')?.setValue(this.hotelData.hotelLocation);
  form.get('hotelImage')?.setValue(this.hotelData.image);
  form.get('rooms')?.setValue(this.rooms);
  form.get('adults')?.setValue(this.adults);
  form.get('children')?.setValue(this.children);
  form.get('dateCheckIn')?.setValue(this.dateCheckIn);
  form.get('dateCheckOut')?.setValue(this.dateCheckOut);
}

private handleBookingSuccess() {
  this.toster.showSuccess('Booking Successful', 'Enjoy your stay!');
  setTimeout(() => {
    this.router.navigateByUrl('user/myBookings');
  }, 300);
  console.log('Booking created successfully');
  this.bookingForm.reset();
}

private handleBookingError(error: any) {
  console.error('Error creating booking:', error);
  this.toster.showError('Booking Failed', 'Please try again later.');
}

private handleInvalidForm() {
  console.log('Form is invalid');
  this.toster.showWarning('Invalid Booking', 'Please fill out all required fields.');
}
incrementRooms(): void {
  this.rooms++;
  this.updateGuestsAndCalculateTotalPrice();
}

decrementRooms(): void {
  if (this.rooms > 1) {
    this.rooms--;
    this.updateGuestsAndCalculateTotalPrice();
  }
}

incrementAdults(): void {
  this.adults++;
  this.updateGuestsAndCalculateTotalPrice();
}

decrementAdults(): void {
  if (this.adults > 1) {
    this.adults--;
    this.updateGuestsAndCalculateTotalPrice();
  }
}

incrementChildren(): void {
  this.children++;
  this.updateGuestsAndCalculateTotalPrice();
}

decrementChildren(): void {
  if (this.children > 0) {
    this.children--;
    this.updateGuestsAndCalculateTotalPrice();
  }
}

onDateChange(): void {
  this.numberOfNights = this.calculateNumberOfNights();
  this.calculateTotalPrice();
}

calculateTotalPrice(): void {
  this.longStayDiscount = this.numberOfNights >= 7 ? 500 : 0;

  const baseTotalPrice = this.rooms * this.pricePerNight * this.numberOfNights;
  const extraGuestCharge = Math.max(0, this.adults + this.children - 4) * 1000;
  let totalPrice = baseTotalPrice + extraGuestCharge;

  // Apply long stay discount
  totalPrice -= this.longStayDiscount;

  // Ensure the total price is not negative
  this.totalPriceBeforeTaxes = Math.max(0, totalPrice);
}

private updateGuestsAndCalculateTotalPrice(): void {
  this.calculateTotalPrice();
}

private calculateNumberOfNights(): number {
  const timeDiff = this.dateCheckOut.getTime() - this.dateCheckIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
*/
