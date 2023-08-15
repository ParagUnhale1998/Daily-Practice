import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
url = "http://localhost:3000/user";
    
getUsers(){
  return this.http.get(this.url)
}

postUsers(data:any){
    return this.http.post(this.url, data)
  }
  getUserByCode(id:any){
    return this.http.get(this.url+'/'+id);
  }
}
