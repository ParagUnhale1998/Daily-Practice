import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { FireAuthService } from 'src/app/shared/fire-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  userData: any;
  userIsRegister: boolean = false;
  forgotPassword: boolean = false;
  loader: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private tosterService: TosterService,
    private fireService: FirestoreService,
    private fireAuth: FireAuthService
  ) {
    this.loginformUser();
  }

  loginformUser() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  forgetPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  forgetpassword() {
    this.forgetPasswordForm();
    this.forgotPassword = true;
  }

  resetPassword() {
    this.loader = true;
    const id = this.forgotPasswordForm.value.email;
    if (id) {
      this.fireAuth
        .sendPasswordResetEmail(id)
        .then((res) => {
          this.tosterService.showSuccess('Password reset email sent successfully', 'Success');
          this.modalService.dismissAll();
          this.activeModal.close();
          this.loader = false;
          console.log('Password reset email sent successfully');
          console.log(res);
          // You can show a success message to the user
        })
        .catch((error) => {
          console.error('Error sending password reset email', error);
          // Handle the error, show an error message to the user, etc.
        });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loader = true;
      const userId = this.loginForm.value.id;
      const password = this.loginForm.value.password;

      // Use a query to retrieve the document based on your custom ID
      this.fireService
        .getUserById(userId)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log(userData);

            this.fireAuth
              .signIn(userId, password)
              .then(() => {
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('userName', userData['name']);
                sessionStorage.setItem(
                  'userProfilePic',
                  userData['profilePic']
                );
                sessionStorage.setItem('UserIsRegister', 'true');

                console.log(
                  this.dataService.userId,
                  this.dataService.userName,
                  this.dataService.getUserIsRegister()
                );
                this.dataService.userId = sessionStorage.getItem('userId');
                this.dataService.userName = sessionStorage.getItem('userName');
                this.dataService.userProfilePic =
                  sessionStorage.getItem('userProfilePic');
                this.dataService.setUserIsRegister(
                  this.dataService.getUserIsRegisteredFromLocalStorage()
                );
                this.handleSuccessfulLogin(userId);
                console.log('Signed in');
              })
              .catch((error) => {
                this.loader = false;
                // Handle error in the component
                console.error('Error in component', error);
                this.handleLoginFailure();
              });
          } else {
            console.log('User not found');
            this.loader = false;
          }
        })
        .catch((error) => {
          this.loader = false;
          console.error('Error getting user data:', error);
        });
    }
  }

  private handleSuccessfulLogin(userId: string) {
    this.tosterService.showSuccess('Login Successful', 'Success');
    // this.dataService.userId = userId;
    this.modalService.dismissAll();
    this.activeModal.close();
    this.loader = false;
  }

  private handleLoginFailure() {
    this.tosterService.showError(
      'Incorrect username or password',
      'Login Failed'
    );
  }

  navigateToSignUp() {
    this.activeModal.close();
    this.modalService.open(SignUpComponent, { centered: true });
  }
}

/* old code without clean
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  userData: any;
  userIsRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private dataService :DataService,
    private tosterService : TosterService
   
  ) {
    this.loginformUser();
  }

  loginformUser() {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const userId = this.loginForm.value.id;
      const password = this.loginForm.value.password;

      this.server.getUser(userId).subscribe((item) => {
        this.userData = item;
        if (this.userData && this.userData.password === password) {
         this.tosterService.showSuccess('login Succesfull','Successfull')
          this.dataService.userId = userId;
          // sessionStorage.setItem('userId', userId);

          this.dataService.setUserIsRegister(true);
          this.dataService.getUserIsRegister().subscribe((value) => {
            this.userIsRegister = value;
          });
          console.log(this.userIsRegister)
          console.log('Successful data:', item);
          this.modalService.dismissAll()
          this.activeModal.close()
          // this.router.navigateByUrl('/user/addPost');
        } else {
          this.tosterService.showError(' Incorrect username or password','Login Failed');
        }
      });

      // Reset the form after submission
      this.loginForm.reset();
    }
  }

  navigateToSignUp() {
    this.activeModal.close()
    this.modalService.open(SignUpComponent, { centered: true });
  }
}
*/
