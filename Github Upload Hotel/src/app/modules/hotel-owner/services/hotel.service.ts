import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private isSidenavOpenSubject = new BehaviorSubject<boolean>(false);
  isSidenavOpen$ = this.isSidenavOpenSubject.asObservable();

  toggleSidenav() {
    this.isSidenavOpenSubject.next(!this.isSidenavOpenSubject.value);
  }
  constructor() { }
}
