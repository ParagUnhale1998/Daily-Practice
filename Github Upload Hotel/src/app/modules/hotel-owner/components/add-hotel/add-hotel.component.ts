import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {

  wifiEnabled: boolean = false;
  privatePool: boolean = false;
  tv: boolean = false;
  freeParking: boolean = false;
  addHotelForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  private initializeForm() {
    this.addHotelForm = this.fb.group({
      image: ['', Validators.required],
      hotelName: ['', Validators.required],
      hotelLocation: ['', Validators.required],
      description: ['', Validators.required],
      beds: [null, Validators.required],
      bath: [null, Validators.required],
      price: [null, [Validators.required]],
      wifiEnabled: [false],
      privatePool: [false],
      tv: [false],
      freeParking: [false],
    });
  }

  private subscribeToFormChanges() {
    this.addHotelForm.valueChanges.subscribe((formValues) => {
      this.wifiEnabled = formValues.wifiEnabled;
      this.privatePool = formValues.privatePool;
      this.tv = formValues.tv;
      this.freeParking = formValues.freeParking;
    });
  }

  onSubmit() {
    if (this.addHotelForm.valid) {
      const formData = this.addHotelForm.value;
      console.log(formData);
      this.addHotelForm.reset();
      this.addHotelForm.markAsPristine();
      this.addHotelForm.markAsUntouched();
    } else {
      this.markFormGroupTouched(this.addHotelForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
