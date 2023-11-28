import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject, catchError, finalize, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  private reposDataSubject = new BehaviorSubject<any[]>([]);
  reposData$ = this.reposDataSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  
  constructor(private apiService: ApiService) {}


  updateLoadingState(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }


  fetchUserData(githubUsername: string): void {
    this.resetState();
    this.updateLoadingState(true);
    this.apiService
      .getUser(githubUsername)
      .pipe(
        mergeMap((userData: any) => {
          this.userDataSubject.next(userData);
          console.log(userData)
          const reposUrl = userData.repos_url;
          return this.apiService.getUserRepos(reposUrl);
        }),
        catchError((error) => {
          console.error('Error fetching user data:', error);
          throw error;
        }),
        finalize(() => {
          this.updateLoadingState(false);
        })
      )
      .subscribe({
        next: (userRepos: any[]) => {
          this.reposDataSubject.next(userRepos);
          console.log('User repositories:', userRepos);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
      });
  }


  setUsername(username: string): void {
    this.usernameSubject.next(username);
    this.fetchUserData(username);
  }



  private resetState(): void {
    // Reset the user data, repositories, and loading state
    this.userDataSubject.next(null);
    this.reposDataSubject.next([]);
    this.loadingSubject.next(false);
  }
}
/*    this.resetState();


  private resetState(): void {
    // Reset the user data, repositories, and loading state
    this.userDataSubject.next(null);
    this.reposDataSubject.next([]);
    this.loadingSubject.next(false);
  }
  */
// fetchUserRepos(userReposLink: string): void {
//   this.apiService.getUserRepos(userReposLink).subscribe(
//     (reposData) => {
//       this.reposDataSubject.next(reposData);
//     },
//     (error) => {
//       console.error('Error fetching user repos:', error);
//     }
//   );
// }

/*
  fetchUserData(githubUsername: string): void {
  
    this.apiService.getUser(githubUsername).pipe(
      mergeMap((userData: any) => {
        this.userDataSubject.next(userData);
        this.updateLoadingState(false)

        console.log(userData)
        const reposUrl = userData.repos_url;
        return this.apiService.getUserRepos(reposUrl);
      })
    ).subscribe(
      (userRepos: any[]) => {
        this.reposDataSubject.next(userRepos);
        console.log('User repositories:', userRepos);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, mergeMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  private reposDataSubject = new BehaviorSubject<any[]>([]);
  reposData$ = this.reposDataSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService) {}

  updateLoadingState(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  fetchUserData(githubUsername: string): void {
    this.updateLoadingState(true);

    this.apiService.getUser(githubUsername).pipe(
      mergeMap((userData: any) => {
        this.userDataSubject.next(userData);
        const reposUrl = userData.repos_url;
        return this.apiService.getUserRepos(reposUrl);
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      }),
      finalize(() => {
        this.updateLoadingState(false);
      })
    ).subscribe(
      (userRepos: any[]) => {
        this.reposDataSubject.next(userRepos);
        console.log('User repositories:', userRepos);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  setUsername(username: string): void {
    this.usernameSubject.next(username);
    this.fetchUserData(username);
  }
}
*/
