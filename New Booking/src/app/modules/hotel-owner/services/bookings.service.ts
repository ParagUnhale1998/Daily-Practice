import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  // private apiUrl = 'http://localhost:3000/bookings';
  private readonly apiUrl = `${environment.API_ENDPOINT}/bookings`;

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(this.apiUrl, bookingData);
  }
  getBookingsByOwner(ownerId: string): Observable<any> {
    const url = `${this.apiUrl}?ownerId=${ownerId}`;
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
