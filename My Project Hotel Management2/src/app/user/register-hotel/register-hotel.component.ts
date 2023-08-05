import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

interface Food {
  value: string;
  viewValue: string;
}

interface Number {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register-hotel',
  templateUrl: './register-hotel.component.html',
  styleUrls: ['./register-hotel.component.scss']
})
export class RegisterHotelComponent {

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialogRef<RegisterHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService,
    private router : Router
  ) { }

  foods: Food[] = [
    { value: 'net-banking', viewValue: 'Net-Banking' },
    { value: 'upi', viewValue: 'UPI' },
    { value: 'qr', viewValue: 'QR' },
  ];

  numbers: Number[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
  ];

  range = this.builder.group({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    fullname: this.builder.control('', Validators.compose([Validators.required])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(10)])),
    payment: this.builder.control('', Validators.required),
    guests: this.builder.control('', Validators.required),
    rooms: this.builder.control('', Validators.required),
  });

  hotelBook() {
    
  }

}
