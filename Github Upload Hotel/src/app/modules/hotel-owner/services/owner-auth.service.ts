import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerAuthService {

  private ownerInfo: any; // Store owner information here

  constructor(private http: HttpClient) {}


  getOwnerData(): Observable<any> {
    // Use stored owner information to make a request for owner data
    return this.http.get<any>(`http://localhost:3000/owners/${this.ownerInfo.id}`);
  }

  logout(): void {
    // Clear stored owner information
    this.ownerInfo = null;
  }
}
