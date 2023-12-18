import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiBaseUrl = 'http://localhost:3000'; 

  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  getCartItems(): any[] {
    return this.cartItems;
  }

  addToCart(item: any): void {
    this.cartItems.push(item);
  }

  removeFromCart(itemId: any): void {
    const index = this.cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  clearCart(): void {
    this.cartItems = [];
  }

  patchUserCart(userId: string, cartData: any): Observable<any> {
    const url = `${this.apiBaseUrl}/users/${userId}`; // Replace with your API endpoint
    return this.http.patch(url, { cart: cartData });
  }

  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/hotels/${hotelId}`;
    return this.http.get(url);
  }
}