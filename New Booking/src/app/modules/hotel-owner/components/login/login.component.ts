import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { OwnerDataService } from '../../services/owner-data.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { FakeJwtService } from 'src/app/core/services/fake-jwt.service';
import { OwnerAuthService } from '../../services/owner-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showSignUp = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hotelOwnerService: HotelService,
    private router: Router,
    private ownerDataService: OwnerDataService,
    private tosterService: TosterMessageService,
    private ownerAuthService: OwnerAuthService,
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  testimonialData = [
    {
      content:
        "Using the travel booking website has significantly improved our business. The platform's efficiency and customer reach are unparalleled. Managing our hotel is now a breeze. Highly recommended!",
      author: 'Satisfied Hotelier',
      position: 'Manager, Luxury Suites',
    },
    {
      content:
        'The travel booking website has been a key factor in our business growth. Its user-friendly design and effective features have made a positive impact on our hotel operations. A must-have for hotel owners!',
      author: 'Thriving Hotel Manager',
      position: 'Director, Comfort Inns',
    },
    {
      content:
        "Our experience with the travel booking website has been outstanding. It has not only simplified our booking process but also attracted a diverse clientele. We're extremely pleased with the results!",
      author: 'Delighted Hotel Owner',
      position: 'CEO, Grand Residences',
    },
    {
      content:
        'The travel booking website is a game-changer for hotel owners. Its intuitive interface and comprehensive features have enhanced our business strategy. Highly recommended for those aiming for success!',
      author: 'Pleased Hotel Manager',
      position: 'COO, Serene Stays',
    },
    {
      content:
        'Our decision to use the travel booking website has proven to be highly beneficial. It has streamlined our booking procedures and brought in a steady stream of guests. A fantastic tool for hotel owners!',
      author: 'Happy Hotel Manager',
      position: 'Manager, Tranquil Inns',
    },
    {
      content:
        "We've witnessed remarkable growth since implementing the travel booking website. Its impact on our hotel's success is undeniable. A valuable asset for any hotel owner looking to thrive in the industry!",
      author: 'Content Hotel Executive',
      position: 'Executive Director, Blissful Retreats',
    },
  ];

  submitLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.ownerAuthService.login(email, password).subscribe(
        (response) => {
          const token = response.token;
          // Handle the token (e.g., store it in a service or localStorage)
          console.log('Token:', token);
          // document.cookie = `authToken=${token}; path=/; HttpOnly; Secure`;
          this.ownerDataService.storeToken(token);

          // Get user ID from the token
          const userId = this.ownerAuthService.getUserIdFromToken(token);
          console.log('User ID:', userId);
          this.ownerDataService.setOwnerId(userId);

          // Check if the user is authenticated
          const isAuthenticated = this.ownerAuthService.isAuthenticated(token);
          console.log('Is Authenticated:', isAuthenticated);
  
          // Handle success, e.g., redirect to another page
          if (isAuthenticated) {
            this.tosterService.showSuccess('Login Successful', 'Welcome back, ' + email);
            setTimeout(() => {
              this.router.navigateByUrl('/owner/profile');
            }, 300);
          } else {
            this.tosterService.showError('Authentication Failed', 'Invalid token or user not authenticated.');
            console.error('Authentication failed');
          }
        },
        (error) => {
          this.tosterService.showError('Login Failed', 'An error occurred while logging in.');
          console.error('Login failed', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display errors
      this.tosterService.showWarning('Invalid Form', 'Please fill in the required fields.');
      this.markFormGroupTouched(this.loginForm);
    }
  }
  /*submitLogin() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.ownerAuthService.login(email, password).pipe(
      switchMap((response) => {
        const token = response.token;
        this.ownerDataService.storeToken(token);

        const userId = this.ownerAuthService.getUserIdFromToken(token);
        this.ownerDataService.setOwnerId(userId);

        const isAuthenticated = this.ownerAuthService.isAuthenticated(token);

        if (isAuthenticated) {
          this.tosterService.showSuccess('Login Successful', 'Welcome back, ' + email);
          return this.router.navigateByUrl('/owner/profile');
        } else {
          throw new Error('Invalid token or user not authenticated.');
        }
      }),
      catchError((error) => {
        this.tosterService.showError('Login Failed', 'An error occurred while logging in.');
        console.error('Login failed', error);
        return of(null); // returning an observable to keep the pipe chain consistent
      })
    ).subscribe(
      () => {
        // Success: Do nothing here, as the logic is handled in the switchMap
      },
      (error) => {
        // Error: Additional error handling can be done here if needed
      }
    );
  } else {
    this.tosterService.showWarning('Invalid Form', 'Please fill in the required fields.');
    this.markFormGroupTouched(this.loginForm);
  }
}
*/

  //     this.hotelOwnerService.getOwner(email).subscribe(
  //       (response) => {
  //         const userData = response; // Assuming the response contains user data

  //         // Check if the entered username and password match the data from the server
  //         if (email === userData.email && password === userData.password) {

  //           // this.ownerDataService.setOwnerId(userData.id);

  //           this.tosterService.showSuccess('Login Successful', 'Welcome back, ' + userData.username);
  //           setTimeout(() => {
  //             this.router.navigateByUrl('/owner/profile')
  //           }, 300);
  //           console.log('Login successful', response);
  //           // Handle success, e.g., redirect to another page
  //         } else {
  //           this.tosterService.showError('Invalid Credentials', 'Please check your username or password.');
  //           console.error('Invalid username or password');
  //           // Handle error, e.g., display an error message
  //         }
  //       },
  //       (error) => {
  //         this.tosterService.showError('Login Failed', 'An error occurred while logging in.');
  //         console.error('Login failed', error);
  //         // Handle error, e.g., display an error message
  //       }
  //     );
  //   } else {
  //     // Form is invalid, mark fields as touched to display errors
  //     this.tosterService.showWarning('Invalid Form', 'Please fill in the required fields.');
  //     this.markFormGroupTouched(this.loginForm);
  //   }
  // }

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
        items: 1,
      },
      600: {
        items: 2,
      },
      800: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
    nav: true,
  };
}
