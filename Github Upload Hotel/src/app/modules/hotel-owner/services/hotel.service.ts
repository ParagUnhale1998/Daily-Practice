import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private isSidenavOpenSubject = new BehaviorSubject<boolean>(false);
  isSidenavOpen$ = this.isSidenavOpenSubject.asObservable();

  toggleSidenav() {
    this.isSidenavOpenSubject.next(!this.isSidenavOpenSubject.value);
  }

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
