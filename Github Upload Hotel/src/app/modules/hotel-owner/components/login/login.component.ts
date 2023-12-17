import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { OwnerDataService } from '../../services/owner-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignUp = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private hotelOwnerService:HotelService,private router :Router,private ownerDataService:OwnerDataService){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.hotelOwnerService.getOwner(email).subscribe(
        (response) => {
          const userData = response; // Assuming the response contains user data
  
          // Check if the entered username and password match the data from the server
          if (email === userData.email && password === userData.password) {
            this.ownerDataService.setUserData(userData);
            this.router.navigateByUrl('/owner/profile')
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

  toggleSection() {
    this.showSignUp = !this.showSignUp;
  }
  generateFakeLoop(count: number): number[] {
    return new Array(count).fill(0).map((_, index) => index);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true, 
    autoplayTimeout: 2000,
  autoplaySpeed: 800,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      800: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
}
