import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerDataService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();

  setUserData(userData: any) {
    console.log('service',userData)
    this.userDataSubject.next(userData);
  }

  getOwnerId(): string {
    const userData = this.userDataSubject.value;
    return userData ? userData.id : '';
  }
  
  getUserData(): any {
    return this.userDataSubject.value;
  }

  logout() {
    // Clear user data when logging out
    this.userDataSubject.next(null);
  }
}