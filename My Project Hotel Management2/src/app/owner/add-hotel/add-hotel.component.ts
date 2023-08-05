import { Component, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnerService } from '../owner.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent implements AfterViewInit {
  hotelRegistration!: FormGroup;

  owner: any | undefined;

  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: OwnerService,
    private toastr: ToastrService,

    public dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = this.data.editMode;
  }

  ngOnInit() {
    this.getOwnerData();

    if (this.editMode) {
      this.updatehotelRegistrationForm();
    } else {
      this.hotelRegistrationForm();
    }
  }

  updatehotelRegistrationForm() {
    this.hotelRegistration = this.formBuilder.group({
      ownerId: [this.data.hotelData.ownerId],
      id: [this.data.hotelData.id, Validators.required],
      hotelName: [this.data.hotelData.hotelName, Validators.required],
      star: [this.data.hotelData.star],
      location: [this.data.hotelData.location],
      price: [this.data.hotelData.price],
      rooms: [this.data.hotelData.rooms],
      discription: [this.data.hotelData.discription],
      phoneNo: [this.data.hotelData.phoneNo],
      availability: [this.data.hotelData.availability],
      image: [this.data.hotelData.image],
      images: [this.data.hotelData.images],
    });
  }

  hotelRegistrationForm() {
    this.hotelRegistration = this.formBuilder.group({
      ownerId: ['paragunhale123'],
      id: ['', Validators.required],
      hotelName: ['', Validators.required],
      star: [''],
      location: [''],
      price: [''],
      rooms: [''],
      discription: [''],
      phoneNo: [''],
      availability: [''],
      image: [''],
      images: [''],
      bookings: this.formBuilder.array([]),
    });
  }

  getOwnerData() {
    const ownerId = this.hotelService.ownerID; // Replace this with the actual owner ID
    // const ownerId = 'paragunhale123'; // Replace this with the actual owner ID
    console.log(ownerId);
    this.hotelService.getOwnerById(ownerId).subscribe(
      (owner) => {
        this.owner = owner;
      },
      (error) => console.error('Error fetching owner data:', error)
    );
  }

  onSubmit() {
    if (this.editMode) {
      const hotelIndex = this.owner.hotels.findIndex(
        (hotel: any) => hotel.id === this.data.hotelData.id
      );
      if (hotelIndex !== -1) {
        this.owner.hotels[hotelIndex] = this.hotelRegistration.value;
        this.hotelService
          .updateALLHotelData(
            this.data.hotelData.id,
            this.hotelRegistration.value
          )
          .subscribe((res) => console.log('update All hotels Data'));
        this.hotelService.updateOwner(this.owner.id, this.owner).subscribe(
          (updatedOwner) => {
            console.log('Hotel Updated:', updatedOwner);
            this.toastr.success(`Hotel`, 'Updated Successfully !!', {
              positionClass: 'toast-top-left',
              timeOut: 2000,
              closeButton: true,
            });
            
            this.owner = updatedOwner;
            this.editMode = false;
            this.hotelRegistration.reset();
            this.dialogRef.close();
            this.data.getHotelData()
          },
          (error) => {
            console.error('Error updating owner data:', error);
            this.toastr.error('Error updating Hotel Data', 'Failed Updating', {
              positionClass: 'toast-top-right',
              timeOut: 2000,
              closeButton: true,
            });
          }
        );
      }
    } else {
      if (this.hotelRegistration.valid) {
        if (this.owner) {
          this.addToAllHotels();
          this.owner.hotels.push(this.hotelRegistration.value);
          this.hotelService.updateOwner(this.owner.id, this.owner).subscribe(
            (updatedOwner) => {
              console.log('Hotel added to owner:', updatedOwner);
              this.toastr.success(
                `Your ${this.hotelRegistration.value.name}`,
                'Hotel Added Successfully !!',
                {
                  positionClass: 'toast-top-left',
                  timeOut: 2000,
                  closeButton: true,
                }
                );
                this.data.getHotelData()
              this.owner = updatedOwner;
            },
            (error) => {
              console.log(error);
              this.toastr.error('Error adding Hotel', 'Failed Hotel', {
                positionClass: 'toast-top-right',
                timeOut: 2000,
                closeButton: true,
              });
            }
            );
            this.hotelRegistration.reset();
            this.dialogRef.close();
          } else {
            this.toastr.error('Error Hotel owner', 'Failed Hotel', {
              positionClass: 'toast-top-right',
              timeOut: 2000,
              closeButton: true,
            });
          }
      }
    }
  }

  addToAllHotels() {
    this.hotelService
      .addHotelToAll(this.hotelRegistration.value)
      .subscribe((data) => console.log(' add alldata' + data));
  }

  cancel() {
    this.dialogRef.close();
    this.editMode = false;
  }

  ngAfterViewInit(): void {
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) {
        this.editMode = false;
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }
}
