import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('User AuthUserInterceptor is triggered!');
    const token = localStorage.getItem('LoginToken');
    console.log('user Token',token)
    const newCloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(newCloneRequest)
  }
}
//   constructor(private authService: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('User AuthUserInterceptor is triggered!');
//     // Check if the request is related to user authentication
//     if (this.isAuthRequest(req)) {
//       // Modify the request to add the encrypted token or credentials
//       const authReq = this.getToken(req);
//       console.log('Modified Request:', authReq);

//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }

//   private isAuthRequest(req: HttpRequest<any>): boolean {
//     // Check if the request URL or other criteria match your user authentication requests
//     // You might check if it's a login/logout request, for example
//     const authRoutes = ['/user/login','/users/login', '/users/user','/user-login']; // Add more routes as needed
//     return authRoutes.some(route => req.url.includes(route));
//   }

//   private getToken(req: HttpRequest<any>): HttpRequest<any> {
//     // Retrieve and encrypt user credentials from AuthService
//     const authToken = this.authService.getUserToken() || '';
//     console.log(authToken)
//     // Clone the request and add the encrypted credentials to the headers
//     const authReq = req.clone({
//       headers: req.headers.set('Authorization', authToken)
//     });

//     return authReq;
//   }
// }
