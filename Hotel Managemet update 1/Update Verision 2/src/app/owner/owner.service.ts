import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  ownerIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
    // true
  );
  ownerIsRegister$ = this.ownerIsRegister.asObservable();

  setOwnerIsRegister(value: boolean) {
    this.ownerIsRegister.next(value);
  }

  getOwnerIsRegister(): boolean {
    return this.ownerIsRegister.getValue();
  }

  ownerID!:string;
  // ownerID:string = 'paragunhale123';

  activeButtonSource: BehaviorSubject<string> = new BehaviorSubject<string>('Home')

  // private activeButtonSource = new Subject<string>('home');
  activeButton$ = this.activeButtonSource.asObservable();

  setActiveButton(button: string) {
    this.activeButtonSource.next(button);
  }
  getActiveButton(): string {
    return this.activeButtonSource.getValue();
  }
  // private functionSubject = new Subject<() => void>();

  // sendFunction(func: () => void): void {
  //   this.functionSubject.next(func);
  // }

  // getFunction(): Subject<() => void> {
  //   return this.functionSubject;
  // }
  
  constructor(private http: HttpClient) { }

  private urlAllHotels = 'http://localhost:3000/Allhotels'
  private url = 'http://localhost:3000/owner';
  private apiUrl = 'http://localhost:3000/owner/';

  getOwner() {
    return this.http.get(this.url);
  }
 
  postOwner(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateOwnerPassword(ownerId: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${ownerId}`, { password: newPassword, confirmPassword: newPassword });
  }

  getOwnerData(ownerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${ownerId}`)
  }
 
  getOwnerById(ownerId: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + ownerId);
  }
  
  addHotelToAll(data: any){
    return this.http.post(this.urlAllHotels, data);
  }

  updateOwner(ownerId: string, updatedOwner: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + ownerId, updatedOwner);
  }

  deleteOwnerHotels(ownerId: string, updatedHotels: any[]): Observable<any> {
    return this.http.patch(`${this.apiUrl}${ownerId}`, { hotels: updatedHotels });
  }
  
  getAllHotels(){
    return this.http.get('http://localhost:3000/Allhotels')
  }
  
  getAllBookings(){
    return this.http.get('http://localhost:3000/Allbookings')
  }

  deleteAllHotelData(hotelId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/Allhotels/${hotelId}`);
  }

  
  deleteAllBooking(id: number): Observable<any> {
    const url = `http://localhost:3000/Allbookings/${id}`;
    return this.http.delete<any>(url);
  }

  // Update a hotel by its ID
  updateALLHotelData(hotelId: string, updatedData: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/Allhotels/${hotelId}`, updatedData);
  }
}
