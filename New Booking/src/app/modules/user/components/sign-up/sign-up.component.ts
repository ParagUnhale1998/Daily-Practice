/*import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Output() toggle = new EventEmitter<void>();
  showSignUp = true;

  loginClick() {
    this.showSignUp = false;
    this.toggle.emit();
  }
  signUpForm!: FormGroup;
  isMatch!: boolean;

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router,private dataService:DataSharingService,private toster : TosterMessageService,private authLoginService:AuthService) { }

  ngOnInit(): void {
   
    // Initialize the form with validation rules
    this.signUpForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      
      cart: this.fb.array([]),
      bookings: this.fb.array([]),
    });

    this.signUpForm.get('email')?.valueChanges.subscribe((email) => {
      this.signUpForm.patchValue({ id: email }, { emitEvent: false });
    });
  }
  ConfirmPass() {
    this.isMatch =this.signUpForm.get('password')?.value === this.signUpForm.get('confirmPassword')?.value;
  }
  // Function to submit the sign-up form
  submitSignUp() {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;

      // Call the user service to register the user
      this.userService.createUser(userData).subscribe(
        (response) => {
          this.toster.showSuccess('Registration Successful', 'Welcome to our platform!');
          // this.dataSharing.setUserRegistrationState(true)
          const email = response.email
          this.authLoginService.login(email)
          this.dataService.userEmail = this.authLoginService.getDecryptedUserEmail()
          const userAuthinticated :boolean = this.authLoginService.isAuthenticated()
          this.dataService.setUserRegistrationState(userAuthinticated)

          setTimeout(() => {
            this.router.navigateByUrl('/user')
          }, 300);
          console.log('Registration successful', response);
          // Handle success, e.g., redirect to another page
        },
        (error) => {
          console.error('Registration failed', error);
          this.toster.showError('Registration Failed', 'Please try again later.');

          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display errors
      this.markFormGroupTouched(this.signUpForm);
      this.toster.showWarning('Invalid Form', 'Please fill out all required fields.');

    }
  }

  // Helper function to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
*/
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @Output() toggle = new EventEmitter<void>();
  showSignUp = true;
  signUpForm!: FormGroup;
  isMatch!: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dataService: DataSharingService,
    private toster: TosterMessageService,
    private authLoginService: AuthService
  ) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): void {
    this.signUpForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      cart: this.fb.array([]),
      bookings: this.fb.array([]),
    });

    this.signUpForm.get('email')?.valueChanges.subscribe((email) => {
      this.signUpForm.patchValue({ id: email }, { emitEvent: false });
    });
  }

  ConfirmPass(): void {
    this.isMatch =
      this.signUpForm.get('password')?.value ===
      this.signUpForm.get('confirmPassword')?.value;
  }

  loginClick(): void {
    this.showSignUp = false;
    this.toggle.emit();
  }

  submitSignUp(): void {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;

      this.userService.createUser(userData).subscribe({
        next: (response) => {
          this.handleSuccessfulRegistration(response);
        },
        error: (error) => {
          this.handleFailedRegistration(error);
        }
      });
    } else {
      this.handleInvalidForm();
    }
  }

  private handleSuccessfulRegistration(response: any): void {
    this.toster.showSuccess('Registration Successful', 'Welcome to our platform!');
    const email = response.email;
    this.authLoginService.login(email);
    this.dataService.userEmail = this.authLoginService.getDecryptedUserEmail();
    const userAuthenticated: boolean = this.authLoginService.isAuthenticated();
    this.dataService.setUserRegistrationState(userAuthenticated);

    setTimeout(() => {
      this.router.navigateByUrl('/user');
    }, 300);
    console.log('Registration successful', response);
  }

  private handleFailedRegistration(error: any): void {
    console.error('Registration failed', error);
    this.toster.showError('Registration Failed', 'Please try again later.');
  }

  private handleInvalidForm(): void {
    this.markFormGroupTouched(this.signUpForm);
    this.toster.showWarning('Invalid Form', 'Please fill out all required fields.');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}