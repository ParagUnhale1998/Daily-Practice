import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { OwnerDataService } from '../../services/owner-data.service';
import { ActivatedRoute } from '@angular/router';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent implements OnInit {
  wifiEnabled: boolean = false;
  privatePool: boolean = false;
  tv: boolean = false;
  freeParking: boolean = false;
  addHotelForm!: FormGroup;
  ownerId: string = '';
  hotelID: any;
  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private ownerDataService: OwnerDataService,
    private route: ActivatedRoute,
    private tosterService :TosterMessageService
  ) {
    this.ownerId = this.ownerDataService.getOwnerId();
    console.log('add hotel' + this.ownerId);
  }

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();

    this.route.params.subscribe((params: { [key: string]: any }) => {
      if (params['mode'] === 'edit' && params['hotelId']) {
        // Fetch the hotel data based on the provided hotelId
        this.hotelID = params['hotelId']

        this.hotelService
          .getHotelById(params['hotelId'])
          .subscribe((hotelData) => {
            // Patch the form with the retrieved hotel data
            this.addHotelForm.patchValue(hotelData);
          });
      }
    });
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
      const hotelData = this.addHotelForm.value;
      if (this.isEditMode()) {
        // Edit mode: Patch the existing hotel data
        this.hotelService.updateHotel(this.ownerId,this.hotelID,hotelData).subscribe(
          () => {
            console.log('Hotel edited successfully');
            this.tosterService.showSuccess('Hotel Edit Successful', 'The hotel details have been updated.');
            this.resetForm();
          },
          (error) => {
            this.tosterService.showError('Error Editing Hotel', 'An error occurred while editing the hotel.');
            console.error('Error editing hotel', error);
          }
        );
      } else {
        // Step 1: Add the hotel to the "hotels" JSON
        this.hotelService.addHotelForOwner(this.ownerId, hotelData).subscribe(
          (hotelResponse) => {
            const newHotelId = hotelResponse.id; // Assuming the response includes the new hotel ID

            // Step 2: Add the hotel ID to the owner's "hotels" array
            this.hotelService
              .updateOwnerHotels(this.ownerId, newHotelId)
              .subscribe(
                () => {
                  this.tosterService.showSuccess('Hotel Added', 'Your new hotel has been added.');
                  console.log('Hotel added successfully');
                  // Reset the form after successful submission
                  this.addHotelForm.reset();
                  this.addHotelForm.markAsPristine();
                  this.addHotelForm.markAsUntouched();
                },
                (error) => {
                  this.tosterService.showError('Error Updating Owner Hotels', 'An error occurred while updating owner hotels.');
                  console.error('Error updating owner hotels', error);
                }
              );
          },
          (error) => {
            this.tosterService.showError('Error Adding Hotel', 'An error occurred while adding the hotel.');
            console.error('Error adding hotel', error);
          }
        );
      }
    } else {
      this.markFormGroupTouched(this.addHotelForm);
      this.tosterService.showWarning('Invalid Form', 'Please fill in the required fields.');
    }
  }
  private isEditMode(): boolean {
    return this.route.snapshot.params['mode'] === 'edit';
  }

  private resetForm() {
    this.addHotelForm.reset();
    this.addHotelForm.markAsPristine();
    this.addHotelForm.markAsUntouched();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
