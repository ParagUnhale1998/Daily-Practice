import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from 'src/app/modules/hotel-owner/services/hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit{
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
  hotelData:any
  userID:any
  constructor(private hotelService:HotelService,private fb: FormBuilder,private userDataSharing:DataSharingService,private bookingService :BookingsService) {
    const today: Date = new Date();
    this.dateCheckIn = today;
  // Check-In Date
  console.log('Check-In Date:', this.dateCheckIn);

  // Set Check-Out Date to Check-In Date + 1 day
  this.dateCheckOut = new Date(this.dateCheckIn);
  this.dateCheckOut.setDate(this.dateCheckIn.getDate() + 1);

  // Log the updated Check-Out Date
  console.log('Check-Out Date:', this.dateCheckOut);
  this.userID = this.userDataSharing.userEmail
  }
  
ngOnInit(): void {
  this.getHotelData()
  this.createBookingForm()

}

getHotelData() {
  this.hotelService.getHotelById(this.hotelId).subscribe(data => {
    this.hotelData = data;
    // Log the data received
    console.log('Hotel Data:', this.hotelData);
    // Calculate and log the number of nights
    this.numberOfNights = this.getNumberOfNights();
    console.log('Number of Nights:', this.numberOfNights);
    // Log the price per night
    this.pricePerNight = this.hotelData.price;
    console.log('Price Per Night:', this.pricePerNight);
    // Calculate and log the total price
    this.calculateTotalPrice();
  });
}

  createBookingForm() {
    this.bookingForm = this.fb.group({
      hotelId: [null,],
      ownerId: [null,],
      userId: [null,],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]], // Add any specific validations for phone number
        rooms: [null, [Validators.required, Validators.min(1)]],
        adults: [null, [Validators.required, Validators.min(1)]],
        children: [null, [Validators.min(0)]],
        dateCheckIn: [null, [Validators.required]],
        dateCheckOut: [null, [Validators.required]],
      totalPrice: [null,],
      nights: [null,],
      hotelName: [null,],
      hotelPrice: [null, ],
      hotelLocation: [null,],
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
  this.bookingForm.get('rooms')?.setValue(this.rooms);
  this.bookingForm.get('adults')?.setValue(this.adults);
  this.bookingForm.get('children')?.setValue(this.children);
  this.bookingForm.get('dateCheckIn')?.setValue(this.dateCheckIn);
  this.bookingForm.get('dateCheckOut')?.setValue(this.dateCheckOut);
  if (this.bookingForm.valid) {
    // Form is valid, perform submission logic

    const formData = this.bookingForm.value;
    
    this.bookingService.createBooking(formData).subscribe(
      (response) => {
        console.log('Booking created successfully:', response);
        this.bookingForm.reset()
        // Optionally, fetch updated booking list
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  } else {
    // Form is invalid, display error messages
    console.log('Form is invalid');
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
