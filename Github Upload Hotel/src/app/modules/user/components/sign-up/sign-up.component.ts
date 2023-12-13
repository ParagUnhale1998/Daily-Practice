import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { UserService } from '../../services/user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
   
    // Initialize the form with validation rules
    this.signUpForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required,this.passwordMatchValidator],
      
      cart: this.fb.array([]),
      bookings: this.fb.array([]),
    });

    this.signUpForm.get('email')?.valueChanges.subscribe((email) => {
      this.signUpForm.patchValue({ id: email }, { emitEvent: false });
    });

  }
  private passwordMatchValidator: ValidatorFn = (signUpForm: AbstractControl): ValidationErrors | null => {
    const password = signUpForm.get('password')?.value;
    const confirmPassword = signUpForm.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  // Function to submit the sign-up form
  submitSignUp() {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;

      // Call the user service to register the user
      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Handle success, e.g., redirect to another page
        },
        (error) => {
          console.error('Registration failed', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display errors
      this.markFormGroupTouched(this.signUpForm);
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
