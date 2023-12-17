import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private isSidenavOpenSubject = new BehaviorSubject<boolean>(false);
  isSidenavOpen$ = this.isSidenavOpenSubject.asObservable();

  toggleSidenav() {
    this.isSidenavOpenSubject.next(!this.isSidenavOpenSubject.value);
  }

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOwner(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/owners/${email}`);
  }
  addOwner(ownerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/owners`, ownerData);
  }
  updateOwner(email: string, ownerData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/owners/${email}`, ownerData);
  }
  deleteOwner(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/owners/${email}`);
  }


  updateOwnerHotels(ownerEmail: string, hotelId: number): Observable<any> {
    const url = `${this.apiUrl}/owners/${ownerEmail}`;

    // Fetch the current owner data
    return this.http.get(url).pipe(
      switchMap((ownerData:any) => {
        // Ensure that the hotelId is not already in the array
        const hotelsArray = ownerData['hotels'] || [];
        if (!hotelsArray.includes(hotelId)) {
          // Add the new hotel ID to the hotels array
          ownerData['hotels'] = hotelsArray.concat(hotelId);

          // Update the owner with the modified data
          return this.http.patch(url, { hotels: ownerData['hotels'] });
        } else {
          // If the hotelId is already present, return an observable with the existing data
          return of(ownerData);
        }
      })
    );
  }

  deleteHotel(hotelId: number, ownerEmail: string): Observable<any> {
  const hotelUrl = `${this.apiUrl}/hotels/${hotelId}`;
  const ownerUrl = `${this.apiUrl}/owners/${ownerEmail}`;

  // First, delete the hotel
  return this.http.delete(hotelUrl).pipe(
    switchMap(() => {
      // After the hotel is deleted, fetch the current owner data
      return this.http.get(ownerUrl);
    }),
    switchMap((ownerData: any) => {
      // Remove the deleted hotel ID from the owner's hotels array
      const updatedHotels = (ownerData['hotels'] || []).filter((id: number) => id !== hotelId);
      
      // Update the owner with the modified data
      return this.http.patch(ownerUrl, { hotels: updatedHotels });
    })
  );
}

  // updateOwnerHotels(ownerEmail: string, hotelId: number): Observable<any> {
  //   const url = `${this.apiUrl}/owners/${ownerEmail}`;

  //   // Fetch the current owner data
  //   return this.http.get(url).pipe(
  //     switchMap((ownerData:any) => {
  //       // Add the new hotel ID to the hotels array
  //       ownerData['hotels'] = ownerData['hotels'] || [];
  //       ownerData['hotels'].push(hotelId);

  //       // Update the owner with the modified data
  //       return this.http.put(url, ownerData);
  //     })
  //   );
  // }
  
  addHotelForOwner(ownerId: string,hotelData: any): Observable<any> {
    hotelData.ownerId = ownerId;
    const url = `${this.apiUrl}/hotels`;
    return this.http.post(url, hotelData);

  }

  getHotelsForOwner(ownerEmail: string): Observable<any[]> {
    const url = `${this.apiUrl}/owners/${ownerEmail}/hotels`;
    return this.http.get<any[]>(url);
  }

  updateHotel(ownerId: string,hotelId: number, hotelData: any): Observable<any> {
    hotelData.ownerId = ownerId;

    const url = `${this.apiUrl}/hotels/${hotelId}`;
    return this.http.put(url, hotelData);
  }

  // deleteHotel(hotelId: number): Observable<any> {
  //   const url = `${this.apiUrl}/hotels/${hotelId}`;
  //   return this.http.delete(url);
  // }

  // Booking operations
  getHotelById(hotelId: number): Observable<any> {
    const url = `${this.apiUrl}/hotels/${hotelId}`;
    return this.http.get(url);
  }
  getBookingsForOwner(ownerEmail: string): Observable<any[]> {
    const url = `${this.apiUrl}/owners/${ownerEmail}/bookings`;
    return this.http.get<any[]>(url);
  }

  deleteBooking(bookingId: number): Observable<any> {
    const url = `${this.apiUrl}/bookings/${bookingId}`;
    return this.http.delete(url);
  }
}
