import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): Observable<boolean> {
    return this.userIsRegister$;
  }

  // userId:any;
  userId:any = 'ParagUnhale';
  private getAllUsersFunctionSubject = new Subject<void>();

  // Observable to subscribe to the getallUsers() function
  getAllUsersFunction$ = this.getAllUsersFunctionSubject.asObservable();

  // Function to emit the event to call the getallUsers() function
  callGetAllUsersFunction() {
    this.getAllUsersFunctionSubject.next();
  }
  private baseUrl = 'http://localhost:3000';
    private userUrl = 'http://localhost:3000/users'; // Replace with your JSON server URL

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  addUser(data:any):Observable<any>{
    return this.http.post(`${this.userUrl}`,data)
  }  

  getAllUser(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }
 
  getUser(userId: any): Observable<any> {
    return this.http.get(`${this.userUrl}/${userId}`);
  }
 
  addPosts(userId:any,userData:any):Observable<any>{
    const patchData = { ...userData }
    return this.http.patch(`${this.userUrl}/${userId}`, patchData);
  }

  showSuccess(msg1:any,msg2:any,){
    this.toastr.success(
      msg1,
      msg2,
      {
        positionClass: 'toast-top-left',
        timeOut: 2000,
        closeButton: true,
      }
    );
  }
 


  // Add a new user
  // addUser(user: any): Observable<any> {
  //   return this.http.post(`${this.userUrl}`, user);
  // }

  // // Get user by ID
  // getUser(userId: number): Observable<any> {
  //   return this.http.get(`${this.userUrl}/${userId}`);
  // }


  // // Add a comment to a post
  // addComment(userId: number, postId: number, comment: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/users/${userId}/posts/${postId}/comments`, { text: comment });
  // }

  // // Get comments for a post
  // getComments(userId: number, postId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/users/${userId}/posts/${postId}/comment`);
  // }

  // // Add a like to a post
  // addLike(userId: number, postId: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/users/${userId}/posts/${postId}/likes`, {});
  // }

  // // Get likes for a post
  // getLikes(userId: number, postId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/users/${userId}/posts/${postId}/like`);
  // }
}
