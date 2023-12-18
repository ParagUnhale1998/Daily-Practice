import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  showSignUp = false;

  toggleSection() {
    this.showSignUp = !this.showSignUp;
  }
 
    loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserService,private dataService:DataSharingService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.getUserByEmail(email).subscribe(
        (response) => {
          const userData = response; // Assuming the response contains user data
          
          // Check if the entered username and password match the data from the server
          if (email === userData.email && password === userData.password) {
            this.dataService.userEmail = email
            this.dataService.setUserRegistrationState(true)
            this.router.navigateByUrl('/user')
            console.log('Login successful', response);
            // Handle success, e.g., redirect to another page
          } else {
            console.error('Invalid username or password');
            // Handle error, e.g., display an error message
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display errors
      this.markFormGroupTouched(this.loginForm);
    }
  }
  

  // Utility method to mark form controls as touched
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
