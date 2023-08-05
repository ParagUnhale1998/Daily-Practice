import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OwnerService } from '../owner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class OwnerLoginComponent {
  loginForm: FormGroup;
  result: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OwnerLoginComponent>,
    private ownerService: OwnerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);

      this.ownerService.getOwnerById(this.loginForm.value.username).subscribe(
        (item) => {
          this.result = item;

          if (this.result.password === this.loginForm.value.password) {
            this.ownerService.setOwnerIsRegister(true);
            this.router.navigateByUrl('partnerWithUs');
            this.toastr.success(
              `welcome ${this.loginForm.value.username}`,
              'Login Successfully !!',
              {
                positionClass: 'toast-top-left',
                timeOut: 2000,
                closeButton: true,
              }
            );
            // alert('loginSuccesfull')
            this.ownerService.ownerID = this.loginForm.value.username;
            // console.log(this.ownerService.ownerID)
            this.dialogRef.close();
          } else {
            console.log('errs');
          }
        },
        (error) => {
          this.toastr.error('User Not Found', 'Failed Login', {
            positionClass: 'toast-top-right',
            timeOut: 2000,
            closeButton: true,
          });
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
