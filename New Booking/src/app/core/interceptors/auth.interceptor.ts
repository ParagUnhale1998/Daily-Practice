import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OwnerDataService } from 'src/app/modules/hotel-owner/services/owner-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: OwnerDataService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('User AuthUserInterceptor is triggered!');
    const token = sessionStorage.getItem('authToken');
    if (token) {
      // Remove surrounding double quotes and unescape the token
      const unescapedToken = token.replace(/^"|"$/g, '');

      // Clone the request and add the token to the headers
      const newCloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${unescapedToken}`
        }
      });

      // Handle the cloned request
      return next.handle(newCloneRequest);
    } else {
      // If the token is null, proceed with the original request
      return next.handle(req);
    }
  }
}
