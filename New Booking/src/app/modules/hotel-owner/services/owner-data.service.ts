import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OwnerAuthService } from './owner-auth.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerDataService {
  private TOKEN_KEY = 'authToken';

  constructor(
    private ownerAuthService: OwnerAuthService,
    private sessionStorage: SessionStorageService // assuming you have a service for session storage
  ) {
    const initialToken = this.getToken();
    console.log(initialToken)
    const initialOwnerId = initialToken ? this.ownerAuthService.getUserIdFromToken(initialToken) : '';
    this.ownerIdSubject = new BehaviorSubject<string>(initialOwnerId);
  }

  private ownerIdSubject = new BehaviorSubject<string>('');
  ownerId$: Observable<string> = this.ownerIdSubject.asObservable();

  setOwnerId(ownerId: any) {
    console.log('Service ownerId', ownerId);
    this.ownerIdSubject.next(ownerId);
  }

  getOwnerId(): string {
    return this.ownerIdSubject.value;
  }

  logout() {
    this.ownerIdSubject.next('');
    this.sessionStorage.remove(this.TOKEN_KEY);
  }

  // Function to retrieve the token from session storage
  getToken(): string | null {
    return this.sessionStorage.get(this.TOKEN_KEY);
  }

  // Function to store the token in session storage
  storeToken(token: string) {
    console.log('Storing token:', token);
    this.sessionStorage.set(this.TOKEN_KEY, token);
  }

}

//   private userDataSubject = new BehaviorSubject<any>(null);
//   userData$: Observable<any> = this.userDataSubject.asObservable();

//   setUserData(userData: any) {
//     console.log('service',userData)
//     this.userDataSubject.next(userData);
//   }

//   getOwnerId(): string {
//     const userData = this.userDataSubject.value;
//     return userData ? userData.id : '';
//   }
  
//   getUserData(): any {
//     return this.userDataSubject.value;
//   }

//   logout() {
//     // Clear user data when logging out
//     this.userDataSubject.next(null);
//   }
// }

//   private ownerIdSubject = new BehaviorSubject<string>('');
//   ownerId$: Observable<string> = this.ownerIdSubject.asObservable();

//   setOwnerId(ownerId: any) {
//     console.log('Service ownerId', ownerId);
//     this.ownerIdSubject.next(ownerId);

//     // Set the authentication token in session storage
//     const authToken = sessionStorage.getItem('authToken');
//     if (authToken) {
//       // Update the existing token with the owner's ID
//       const updatedToken = this.updateTokenWithOwnerId(authToken, ownerId);
//       sessionStorage.setItem('authToken', updatedToken);
//     } else {
//       // Create a new token with the owner's ID and store it in session storage
//       const newToken = this.createTokenWithOwnerId(ownerId);
//       sessionStorage.setItem('authToken', newToken);
//     }
//   }

//   getOwnerId(): string {
//     return this.ownerIdSubject.value;
//   }

//   logout() {
//     // Clear ownerId and remove the authentication token from session storage when logging out
//     this.ownerIdSubject.next('');
//     sessionStorage.removeItem('authToken');
//   }

//   // Update the existing token with the owner's ID
//   private updateTokenWithOwnerId(token: string, ownerId: string): string {
//     // Replace or update the claims in the existing token as needed
//     const decodedToken = JSON.parse(atob(token));
//     decodedToken.id = ownerId;

//     // Use a real token generation library or service in a production scenario
//     const updatedToken = btoa(JSON.stringify(decodedToken));

//     return updatedToken;
//   }

//   // Create a new token with the owner's ID
//   private createTokenWithOwnerId(ownerId: string): string {
//     const tokenPayload = {
//       id: ownerId,
//       // Add more claims as needed
//     };

//     // Use a real token generation library or service in a production scenario
//     const newToken = btoa(JSON.stringify(tokenPayload));

//     return newToken;
//   }
// }
