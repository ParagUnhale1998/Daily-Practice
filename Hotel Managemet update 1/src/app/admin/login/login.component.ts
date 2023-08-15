import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;

  result: any;

  constructor(
    private router: Router,
    private offcanvasService: NgbOffcanvas,
    private builder: FormBuilder,
    private service: AdminService,
    private toastr: ToastrService,

  ) {}

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  submitLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.service.getAdmin(this.loginForm.value.id).subscribe(
        (item) => {
          this.result = item;

          if (this.result.password === this.loginForm.value.password) {
            
            this.service.setAdminIsRegister(true);
            this.toastr.success(`Login Successful`,'Admin', {
              positionClass: 'toast-top-left',
              timeOut: 2000,
              closeButton: true,
            });
            this.offcanvasService.dismiss('Cross click');

            this.router.navigateByUrl('/admin/adminHome');
          } else {
            this.toastr.error(`Login Failed`,'Admin', {
              positionClass: 'toast-top-right',
              timeOut: 2000,
              closeButton: true,
            });
          }
        },
        (error) => {
          console.error(error);
          this.toastr.error(`Admin Not Found`,'Error', {
            positionClass: 'toast-top-right',
            timeOut: 2000,
            closeButton: true,
          });
        }
      );
    } else {
    }
  }

  ngAfterViewInit(): void {
    if (this.router.url === '/admin/login' || this.router.url === '/admin') {
      this.openCustomBackdropClass();
    }
  }

  close() {
    this.offcanvasService.dismiss('Cross click');
    this.router.navigateByUrl('/');
  }

  openCustomBackdropClass() {
    this.offcanvasService.open(this.contentTemplate, {
      backdropClass: 'background',
      backdrop: 'static',
    });
  }
}
