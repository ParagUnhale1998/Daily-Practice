import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiBaseUrl = `${environment.API_ENDPOINT}/users`;;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBaseUrl);
  }

  getUserByEmail(email: string): Observable<any> {
    const userUrl = `${this.apiBaseUrl}/${email}`;
    return this.http.get<any>(userUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiBaseUrl, user);
  }

  updateUser(email: string, updatedUser: any): Observable<any> {
    const userUrl = `${this.apiBaseUrl}/${email}`;
    return this.http.put(userUrl, updatedUser);
  }

  patchUser(email: string, patchData: any): Observable<any> {
    const userUrl = `${this.apiBaseUrl}/${email}`;
    return this.http.patch(userUrl, patchData);
  }

  deleteUser(email: string): Observable<any> {
    const userUrl = `${this.apiBaseUrl}/${email}`;
    return this.http.delete(userUrl);
  }
}
