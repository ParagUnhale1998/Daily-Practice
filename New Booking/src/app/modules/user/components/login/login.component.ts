/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: UserService,private dataService:DataSharingService,private router:Router,private tosterMessage:TosterMessageService,private authLoginService:AuthService) {
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
            this.authLoginService.login(email)
            this.dataService.userEmail = this.authLoginService.getDecryptedUserEmail()
            const userAuthinticated :boolean = this.authLoginService.isAuthenticated()
            this.dataService.setUserRegistrationState(userAuthinticated)
            this.tosterMessage.showSuccess('Login successful','Success')
            console.log('Login successful', response);
            this.loginForm.reset()
            setTimeout(() => {
              this.router.navigateByUrl('/user');
            }, 300);

            // Handle success, e.g., redirect to another page
          } else {
            console.error('Invalid username or password');
            this.tosterMessage.showWarning('Invalid username or password','Failed')

            // Handle error, e.g., display an error message
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.tosterMessage.showError('Incorrect username or password','Login failed')

          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Form is invalid, mark fields as touched to display errors
      this.markFormGroupTouched(this.loginForm);
      this.tosterMessage.showWarning('Please Enter Email and Password','Form Invalid');

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
*/import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignUp = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private dataService: DataSharingService,
    private router: Router,
    private tosterMessage: TosterMessageService,
    private authLoginService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleSection() {
    this.showSignUp = !this.showSignUp;
  }

  submitLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      
      this.authService.getUserByEmail(email).subscribe({
        next: (userData) => {
          if (this.isCredentialsValid(email, password, userData)) {
            this.handleSuccessfulLogin(email);
          } else {
            this.handleInvalidCredentials();
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.tosterMessage.showError('Incorrect username or password', 'Login failed');
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
      this.tosterMessage.showWarning('Please Enter Email and Password', 'Form Invalid');
    }
  }
  

  private isCredentialsValid(email: string, password: string, userData: any): boolean {
    return email === userData.email && password === userData.password;
  }

  private handleSuccessfulLogin(email: string): void {
    this.authLoginService.login(email);
    this.dataService.userEmail = this.authLoginService.getDecryptedUserEmail();
    const userAuthenticated: boolean = this.authLoginService.isAuthenticated();
    this.dataService.setUserRegistrationState(userAuthenticated);
    this.tosterMessage.showSuccess('Login successful', 'Success');
    this.loginForm.reset();
    setTimeout(() => {
      this.router.navigateByUrl('/user');
    }, 300);
  }

  private handleInvalidCredentials(): void {
    console.error('Invalid username or password');
    this.tosterMessage.showWarning('Invalid username or password', 'Failed');
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
/* Using RXJS
submitLogin(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.authService.getUserByEmail(email).pipe(
      switchMap((userData) => {
        if (this.authService.isCredentialsValid(email, password, userData)) {
          return this.authService.performLogin(email); // Assuming you have a login method in your service
        } else {
          return of(false); // Returning a falsy value to indicate invalid credentials
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        this.tosterMessage.showError('Incorrect username or password', 'Login failed');
        return of(false); // Returning a falsy value to handle the error gracefully
      })
    ).subscribe((loginSuccessful) => {
      if (loginSuccessful) {
        this.handleSuccessfulLogin(email);
      } else {
        this.handleInvalidCredentials();
      }
    });
  } else {
    this.markFormGroupTouched(this.loginForm);
    this.tosterMessage.showWarning('Please Enter Email and Password', 'Form Invalid');
  }
}*/