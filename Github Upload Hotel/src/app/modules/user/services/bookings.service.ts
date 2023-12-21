import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingData);
  }

  getBookingsforUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get(url);
  }
  getBookings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteBooking(bookingId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookingId}`;
    return this.http.delete(url);
  }
}