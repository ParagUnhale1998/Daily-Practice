import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerLoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { OwnerService } from '../owner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registrationForm!: FormGroup;

  isMatch!: boolean;
  isValid!: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private ownerService: OwnerService,
    private toastr :ToastrService
  ) {}
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      id: ['', [Validators.required, this.whiteSpaceValidator]], //Validators.pattern(/^\S*$/)
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      phoneNO: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.whiteSpaceValidator,
        ],
      ],
      confirmPassword: ['', Validators.required],
      idCard: [null],
      address: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      hotels: this.formBuilder.array([]),
      bookings: this.formBuilder.array([]),
    });
  }
  whiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    let data = control.value;
    let newdata = data?.trim();
    let isValid = data.length != newdata.length;
    return isValid ? { whiteSpace: true } : null;
  }

  ConfirmPass() {
    this.isMatch =
      this.registrationForm.get('password')?.value ===
      this.registrationForm.get('confirmPassword')?.value;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission here
      this.ownerService.postOwner(this.registrationForm.value).subscribe(
        (response) => {
          // console.log('Owner added successfully!', response);
          this.ownerService.setOwnerIsRegister(true);
          this.router.navigateByUrl('partnerWithUs');
          // Optionally, you can handle the response here or navigate to a success page
          this.toastr.success(
            `welcome ${this.registrationForm.value.name}`,
            'Login Successfully !!',
            {
              positionClass: 'toast-top-left',
              timeOut: 2000,
              closeButton: true,
            }
          );
        },
        (error) => {
          console.error('Error adding owner:', error);
          this.toastr.error('Error adding owner', 'Failed SignUp', {
            positionClass: 'toast-top-right',
            timeOut: 2000,
            closeButton: true,
          });
          // Optionally, you can handle the error here or display an error message
        }
      );

      console.log(this.registrationForm.value);
      this.registrationForm.reset();
    }
  }
  navigateToLogin() {
    this.dialog.open(OwnerLoginComponent, {
      // Pass any data needed by the dialog here (e.g., hotel data)
    });
  }
  navigateToHomePage() {
    this.router.navigateByUrl('/user');
  }
}
