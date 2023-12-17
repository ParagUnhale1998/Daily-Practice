import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private userIsRegisteredSubject = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in user registration state
  userIsRegistered$ = this.userIsRegisteredSubject.asObservable();

  // Function to update the user registration state
  setUserRegistrationState(isRegistered: boolean): void {
    this.userIsRegisteredSubject.next(isRegistered);
  }
}
