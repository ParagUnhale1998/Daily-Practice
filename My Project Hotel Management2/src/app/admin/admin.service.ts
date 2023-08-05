import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  adminIsRegister$ = this.adminIsRegister.asObservable();

  setAdminIsRegister(value: boolean) {
    this.adminIsRegister.next(value);
  }

  getAdminIsRegister(): boolean {
    return this.adminIsRegister.getValue();
  }

   private url = 'http://localhost:3000/'

   constructor(private http: HttpClient) {}

   getAdmin(id: any) {
    return this.http.get(this.url + 'admin/' + id);
  }
   
  getUsersOwners(endpoint:any) {
    return this.http.get(this.url + endpoint);
  }

  
  }
