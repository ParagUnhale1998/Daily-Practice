import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OwnerDataService } from '../modules/hotel-owner/services/owner-data.service';
import { AuthService } from './services/auth.service';
import { AuthUserInterceptor } from './interceptors/auth-user.interceptor';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    OwnerDataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
  
})
export class CoreModule { }
