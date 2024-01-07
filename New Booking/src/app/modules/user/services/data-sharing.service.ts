import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  userInstructions :boolean = true

  private userIsRegisteredSubject = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in user registration state
  userIsRegistered$ = this.userIsRegisteredSubject.asObservable();

  // Function to update the user registration state
  setUserRegistrationState(isRegistered: boolean): void {
    this.userIsRegisteredSubject.next(isRegistered);
  }
  
  userEmail!:string;
  // userEmail:string= 'paragunhale1998@gmail.com'
  constructor(private authLoginService:AuthService) {
    this.userEmail = this.authLoginService.getDecryptedUserEmail()
    const userAuthinticated :boolean = this.authLoginService.isAuthenticated()
    this.setUserRegistrationState(userAuthinticated)
}


}/*import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'path-to-auth-service'; // Update the path

export class DataSharingService {

  private userIsRegisteredSubject = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to changes in user registration state
  userIsRegistered$ = this.userIsRegisteredSubject.asObservable();

  userEmail: string = '';

  // userEmail: string = 'paragunhale1998@gmail.com'; // Consider initializing here if needed

  constructor(private authLoginService: AuthService) {
    this.initializeUserEmail();
    const userAuthenticated: boolean = this.authLoginService.isAuthenticated();
    this.setUserRegistrationState(userAuthenticated);
  }

  private initializeUserEmail(): void {
    this.userEmail = this.authLoginService.getDecryptedUserEmail();
  }

  // Function to update the user registration state
  setUserRegistrationState(isRegistered: boolean): void {
    this.userIsRegisteredSubject.next(isRegistered);
  }
}
*/