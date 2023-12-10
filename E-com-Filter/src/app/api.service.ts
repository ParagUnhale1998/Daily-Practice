import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  // private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductsByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/?title=${title}`);
  }

  getProductsByPrice(price: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/?price=${price}`);
  }

  getProductsByPriceRange(min: number, max: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/?price_min=${min}&price_max=${max}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/?categoryId=${categoryId}`);
  }
}
