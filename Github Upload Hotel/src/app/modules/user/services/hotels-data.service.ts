import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsDataService {
  private baseUrl = 'http://localhost:3000/hotels';
  private fakeTourDataURL = 'http://localhost:3000/fakeTourData'
  private fakeActivityDataURL = 'http://localhost:3000/fakeActivityData'
  
  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.baseUrl}/${hotelId}`;
    return this.http.get(url);
  }
  getFakeTourData(): Observable<any[]> {
    return this.http.get<any[]>(this.fakeTourDataURL);
  }
  getFakeActivityData(): Observable<any[]> {
    return this.http.get<any[]>(this.fakeActivityDataURL);
  }
}
