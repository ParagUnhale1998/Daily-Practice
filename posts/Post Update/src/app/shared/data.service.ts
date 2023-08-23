import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  editMode: boolean = false;
  userId: any;
  // userId: any = 'ParagUnhale1998';

  private userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): Observable<boolean> {
    return this.userIsRegister$;
  }


  private getAllUsersFunctionSubject = new Subject<void>();

  // Observable to subscribe to the getallUsers() function
  getAllUsersFunction$ = this.getAllUsersFunctionSubject.asObservable();

  // Function to emit the event to call the getallUsers() function
  callGetAllUsersFunction() {
    this.getAllUsersFunctionSubject.next();
  }
}
