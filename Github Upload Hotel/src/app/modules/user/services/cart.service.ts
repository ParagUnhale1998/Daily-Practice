import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = `${environment.API_ENDPOINT}/users`;
  private readonly apiBaseUrl = environment.API_ENDPOINT;

  userID: any;

  constructor(
    private http: HttpClient,
    private dataService: DataSharingService
  ) {
    this.userID = this.dataService.userEmail;
  }

  addToCart(oldCartData: any, hotel: any): Observable<any> {
    const url = `${this.baseUrl}/${this.userID}`;
    const oldCart = oldCartData; // Get old cart before adding
    const updatedCart = [...oldCart, hotel];
    return this.http.patch(url, { cart: updatedCart });
  }

  removeFromCart(oldCartData: any, hoteID: any): Observable<any> {
    const url = `${this.baseUrl}/${this.userID}`;
    const oldCart = oldCartData; // Get old cart before removing
    const updatedCart = oldCart.filter((h: any) => h.id !== hoteID);
    return this.http.patch(url, { cart: updatedCart });
  }

  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/hotels/${hotelId}`;
    return this.http.get(url);
  }
}
/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly baseUrl = `${environment.API_ENDPOINT}/users`;
  private readonly apiBaseUrl = environment.API_ENDPOINT;

  userID!: string | null;

  constructor(
    private http: HttpClient,
    private dataService: DataSharingService
  ) {
    this.userID = this.dataService.userEmail;
  }

  addToCart(oldCart: any[], hotel: any): Observable<any> {
    const url = `${this.baseUrl}/${this.userID}`;
    const updatedCart = [...oldCart, hotel];
    return this.http.patch(url, { cart: updatedCart });
  }

  removeFromCart(oldCart: any[], hotelID: any): Observable<any> {
    const url = `${this.baseUrl}/${this.userID}`;
    const updatedCart = oldCart.filter((h: any) => h.id !== hotelID);
    return this.http.patch(url, { cart: updatedCart });
  }

  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/hotels/${hotelId}`;
    return this.http.get(url);
  }
}
*/
