import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): boolean {
    return this.userIsRegister.getValue();
  }
  selectedHotel!: any;
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/user';
  urlBookingHotel = 'http://localhost:3000/';

  getUsers() {
    return this.http.get(this.url);
  }

  postUsers(data: any) {
    return this.http.post(this.url, data);
  }
  getUserByCode(id: any) {
    return this.http.get(this.url + '/' + id);
  }
  BookHotel(endpoint:string,data: any) {
    return this.http.post(this.urlBookingHotel + endpoint, data);
  }


  getHotelList(){
    return this.http.get('http://localhost:3000/Allhotels')
  }
}
