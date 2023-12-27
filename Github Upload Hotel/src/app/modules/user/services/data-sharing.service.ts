import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
  
  userEmail!:string;
  // userEmail:string= 'paragunhale1998@gmail.com'
  constructor(private authLoginService:AuthService) {
    this.userEmail = this.authLoginService.getDecryptedUserEmail()
    const userAuthinticated :boolean = this.authLoginService.isAuthenticated()
    this.setUserRegistrationState(userAuthinticated)
}

}
