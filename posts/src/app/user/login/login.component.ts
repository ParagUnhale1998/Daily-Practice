import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
         this.server.showSuccess('login Succesfull','Successfull')
          this.server.userId = userId;
          this.server.setUserIsRegister(true);
          this.server.getUserIsRegister().subscribe((value) => {
            this.userIsRegister = value;
          });
          console.log(this.userIsRegister)
          console.log('Successful data:', item);
          this.modalService.dismissAll()
          this.activeModal.close()
          // this.router.navigateByUrl('/user/addPost');
        } else {
          alert('Login Failed: Incorrect username or password.');
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
