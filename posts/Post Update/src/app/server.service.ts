import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private baseUrl = 'http://localhost:3000';
  private userUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

 
  getAllUser(): Observable<any> {
    return this.http.get(`${this.userUrl}`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.userUrl}`, data);
  }

  getUser(userId: any): Observable<any> {
    return this.http.get(`${this.userUrl}/${userId}`);
  }

  patchUser(userId: any, userData: any): Observable<any> {
    return this.http.patch(`${this.userUrl}/${userId}`, userData);
  }

  updateUser(userId: any, userData: any): Observable<any> {
    const patchData = { ...userData };
    return this.http.patch(`${this.userUrl}/${userId}`, patchData);
  }

  
}


/*  old code without clean code

  editMode :boolean = false;
  
  trendingHashtags: Hashtag[] = [];
  private trendingHashtagsSubject = new BehaviorSubject<Hashtag[]>([]);
  trendingHashtags$ = this.trendingHashtagsSubject.asObservable();

  extractHashtagsFromPostContent(content: string): string[] {
    // Regular expression to find hashtags in the post content
    const regex = /#(\w+)/g;
    const matches = content.match(regex);

    if (matches) {
      // Remove the '#' character from the matches
      return matches.map(match => match.substring(1));
    }

    return [];
  }


  updateTrendingHashtags(allUsers:any): void {
    // Clear the existing trending hashtags
    this.trendingHashtags = [];

    // Your logic to extract hashtags from all posts and update the trendingHashtags array
    const hashtagsMap: Map<string, number> = new Map();
    allUsers.forEach((user:any) => {
      user.posts.forEach((post:any) => {
        const hashtags = this.extractHashtagsFromPostContent(post.content);
        hashtags.forEach((tag:any) => {
          const count = hashtagsMap.get(tag) || 0;
          hashtagsMap.set(tag, count + 1);
        });
      });
    });

    // Convert the map to an array of Hashtag objects
    this.trendingHashtags = Array.from(hashtagsMap.entries()).map(([name, count]) => ({ name, count }));

    // Sort the trending hashtags based on count in descending order
    this.trendingHashtags.sort((a, b) => b.count - a.count);

    // Get the top ten hashtags
    this.trendingHashtags = this.trendingHashtags.slice(0, 10);
    this.trendingHashtagsSubject.next(this.trendingHashtags);

  }


  private userIsRegister: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  userIsRegister$ = this.userIsRegister.asObservable();

  setUserIsRegister(value: boolean) {
    this.userIsRegister.next(value);
  }

  getUserIsRegister(): Observable<boolean> {
    return this.userIsRegister$;
  }

  // userId:any;
  
  userId:any = 'ParagUnhale1998';
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
  patchUser(userId: any, userData: any): Observable<any> {
    return this.http.patch(`${this.userUrl}/${userId}`, userData);
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
 */
