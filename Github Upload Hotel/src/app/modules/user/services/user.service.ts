import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost:3000'; // Update with your JSON Server base URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/users`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/users/${email}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users`, user);
  }

  updateUser(email: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/users/${email}`, updatedUser);
  }

  patchUser(email: string, patchData: any): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/users/${email}`, patchData);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/users/${email}`);
  }
}
