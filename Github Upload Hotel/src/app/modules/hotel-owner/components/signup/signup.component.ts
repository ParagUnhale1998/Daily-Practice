import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { OwnerDataService } from '../../services/owner-data.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  showSignUp = true;
  registrationForm!: FormGroup;
  isMatch!: boolean;

  constructor(private fb: FormBuilder,private hotelOwnerService:HotelService,private router :Router,private ownerDataService:OwnerDataService,private tosterService:TosterMessageService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      // email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{1,10}$/), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      idCard: [null, Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      hotels: this.fb.array([]),
      bookings: this.fb.array([]),
    });
    this.registrationForm.get('confirmPassword')?.setValidators([Validators.required, this.passwordMatch.bind(this)]);
    this.registrationForm.get('email')?.valueChanges.subscribe((email) => {
      this.registrationForm.patchValue({ id: email }, { emitEvent: false });
    });

  }

  passwordMatch(control: { value: string }): { [key: string]: boolean } | null {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }


  ConfirmPass() {
    this.isMatch =this.registrationForm.get('password')?.value === this.registrationForm.get('confirmPassword')?.value;
  }
  onFileChange(event: any): void {
    const input = event.target;
    const fileChosenElement = document.getElementById('file-chosen');
  
    if (fileChosenElement) {
      const fileName = input.files?.length ? input.files[0].name : 'Choose a file';
      fileChosenElement.textContent = fileName;
    }
  }
  
  submitForm(): void {
    console.log('submit')
    if (this.registrationForm.valid) {
      const ownerData = this.registrationForm.value;
  
      // Assuming your OwnerService is injected in the component
      this.hotelOwnerService.addOwner(ownerData).subscribe(
        (response) => {
          this.tosterService.showSuccess('Registration Successful', 'Welcome, ' + ownerData.username);
        
          // this.ownerDataService.setUserData(ownerData);
          this.ownerDataService.setOwnerId(ownerData.id);

          setTimeout(() => {
            this.router.navigateByUrl('/owner/profile')
          }, 300);
          console.log('Owner added successfully:', response);
           
          // Optionally, you can reset the form after successful submission
          this.registrationForm.reset();
        },
        (error) => {
          this.tosterService.showError('Error Adding Owner', 'An error occurred while adding the owner.');
          console.error('Error adding owner:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
      this.tosterService.showWarning('Invalid Form', 'Please fill in the required fields.');
    }
  }
  

  loginClick() {
    this.showSignUp = false;
    this.toggle.emit();
  }
}
