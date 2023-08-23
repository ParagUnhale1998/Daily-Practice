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
    private dataService: DataService,
    private tosterService: TosterService
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
      this.server.getUser(userId).subscribe({
        next: (data) => {
          this.userData = data;
          if (this.userData && this.userData.password === password) {
            this.handleSuccessfulLogin(userId);
          } else {
            this.handleLoginFailure();
          }
        },
        error: (error) => {
          this.handleLoginFailure();
        },
      });
    }
  }

  private handleSuccessfulLogin(userId: string) {
    this.tosterService.showSuccess('Login Successful', 'Success');
    this.dataService.userId = userId;
    this.dataService.setUserIsRegister(true);
    this.modalService.dismissAll();
    this.activeModal.close();
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
