import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OwnerLoginComponent } from 'src/app/owner/login/login.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showSignUp: boolean = false;
  showLogin: boolean = true;
  result: any;

  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {}

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.service.getUserByCode(this.loginForm.value.id).subscribe(
        (item) => {
          this.result = item;

          if (this.result.password === this.loginForm.value.password) {
            this.service.setUserIsRegister(true);
            this.snackBar.open('Login Successful', 'Dismiss', {
              duration: 1000, // The duration for which the pop-up will be visible (in milliseconds)
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition : 'end' // Custom CSS class for the pop-up
            });
            this.router.navigateByUrl('/user');
            // this.toastr.success('Login Successful');
          } else {
            // this.toastr.error('Please check the password', 'Wrong Password');
            this.snackBar.open('Please check the password', 'Dismiss', {
              duration: 1000, // The duration for which the pop-up will be visible (in milliseconds)
              panelClass: 'success-snackbar',
              verticalPosition: 'top',
              horizontalPosition : 'end' // Custom CSS class for the pop-up
            });
          }
        },
        (error) => {
          this.toastr.error('User not found', 'Error');
          console.error(error);
        }
      );
    } else {
      // this.toastr.warning('Please Enter Something in fields');
      this.snackBar.open('Please Enter Something in fields', 'Dismiss', {
        duration: 1000, // The duration for which the pop-up will be visible (in milliseconds)
        panelClass: 'success-snackbar',
        verticalPosition: 'top',
        horizontalPosition : 'end' // Custom CSS class for the pop-up
      });
    }
  }

  showSignUpForm() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = !this.showLogin;
  }
  showloginpage() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = !this.showLogin;
  }
  navigateToLogin(){
    this.dialog.open(OwnerLoginComponent, {
      // Pass any data needed by the dialog here (e.g., hotel data)
    });
  }
}
