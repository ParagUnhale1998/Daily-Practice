import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  editMode: boolean = false;
  userId: any = sessionStorage.getItem('userId')
  // userId: any = 'ParagUnhale1998';
  userName:any =sessionStorage.getItem('userName')
  userProfilePic:any = sessionStorage.getItem('userProfilePic')
 
  private userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getUserIsRegisteredFromLocalStorage());

  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): Observable<boolean> {
    return this.userIsRegister$;
  }

  getUserIsRegisteredFromLocalStorage(): boolean {
    const storedValue = sessionStorage.getItem('UserIsRegister');
    // Convert the string value to a boolean using a simple comparison.
    return storedValue === 'true';
  }


  private getAllUsersFunctionSubject = new Subject<void>();

  // Observable to subscribe to the getallUsers() function
  getAllUsersFunction$ = this.getAllUsersFunctionSubject.asObservable();

  // Function to emit the event to call the getallUsers() function
  callGetAllUsersFunction() {
    this.getAllUsersFunctionSubject.next();
  }
}
