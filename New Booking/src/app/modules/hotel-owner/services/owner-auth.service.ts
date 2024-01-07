import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthService {
  // private apiUrl = 'http://localhost:3000'
  private readonly apiUrl = `${environment.API_ENDPOINT}`;

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getUserIdFromToken(token: string): string  {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.email : '';
  }

  isAuthenticated(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }
}

  // private ownerInfo: any; // Store owner information here


  // getOwnerData(): Observable<any> {
  //   // Use stored owner information to make a request for owner data
  //   return this.http.get<any>(`http://localhost:3000/owners/${this.ownerInfo.id}`);
  // }
  // logout(): void {
  //   // Clear stored owner information
  //   this.ownerInfo = null;
  // }