import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HotelsDataService {


  private readonly baseUrl = `${environment.API_ENDPOINT}/hotels`;
  private readonly fakeTourDataURL = `${environment.API_ENDPOINT}/fakeTourData`;
  private readonly fakeActivityDataURL = `${environment.API_ENDPOINT}/fakeActivityData`;

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

/*'http://localhost:3000/hotels';
'http://localhost:3000/fakeTourData'
 'http://localhost:3000/fakeActivityData'*/

 /*import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export class DataService {

  private readonly baseUrl = `${environment.API_ENDPOINT}/hotels`;
  private readonly fakeTourDataURL = `${environment.API_ENDPOINT}/fakeTourData`;
  private readonly fakeActivityDataURL = `${environment.API_ENDPOINT}/fakeActivityData`;

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.baseUrl}/${hotelId}`;
    return this.http.get<any>(url);
  }

  getFakeTourData(): Observable<any[]> {
    return this.http.get<any[]>(this.fakeTourDataURL);
  }

  getFakeActivityData(): Observable<any[]> {
    return this.http.get<any[]>(this.fakeActivityDataURL);
  }
}
*/