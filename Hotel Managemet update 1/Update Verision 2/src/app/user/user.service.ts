import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/user';
  urlBookingHotel = 'http://localhost:3000/';
  userId:any
  // userId:any= 'paragunhale';
  Userpassword:any;
  // Userpassword:any = 'parag123'
  userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): boolean {
    return this.userIsRegister.getValue();
  }

  selectedHotel!: any;


  constructor(private http: HttpClient) {}


  getUsers() {
    return this.http.get(this.url);
  }

  postUsers(data: any) {
    return this.http.post(this.url, data);
  }
  
  getUserByCode(id: any) {
    return this.http.get(this.url + '/' + id);
  }
  
  BookHotel(endpoint: string, data: any) {
    return this.http.post(this.urlBookingHotel + endpoint, data);
  }
  
 updateUser(id:any,updateData:any){
  return this.http.patch(`${this.url}/${id}`, updateData);
 }
  getHotelList() {
    return this.http.get('http://localhost:3000/Allhotels');
  }

  addToCart(userId: string, newItem: any) {
    // const data = { cart: hotel };
    return this.http.patch(`${this.url}/${userId}`, newItem);
  }

  removeFromCart(userId: string, updateCart: any){
        return this.http.patch(`${this.url}/${userId}`, updateCart);

  }

  private cartDataSubject = new BehaviorSubject<{ ownerId: string; hotelId: string } | null>(null);
  cartData$ = this.cartDataSubject.asObservable();

  updateCartData(ownerId: string, hotelId: string) {
    this.cartDataSubject.next({ ownerId, hotelId });
  }

  // private cartUpdateSubject = new Subject<void>();

  // cartUpdate$ = this.cartUpdateSubject.asObservable();

  // triggerCartUpdate() {
  //   this.cartUpdateSubject.next();
  // }
  // removeFromCart(userId: string, hotelIndex: any){
  //   return this.http.patch(`${this.url}/${userId}`, {
  //     cart: (cart: any[]) => cart.splice(hotelIndex,0)
  //   });
  // }
}
