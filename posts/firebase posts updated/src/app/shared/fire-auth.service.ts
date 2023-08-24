import { Injectable } from '@angular/core';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, sendPasswordResetEmail ,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, Auth } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  user: User | null = null;
  auth: Auth;

  constructor(private dataService:DataService) {
    this.auth = getAuth();

    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      console.log(this.user)
    });
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
    
  }

async sendPasswordResetEmail(email: string) {
    return await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log('Password reset email sent');
        console.log(this.auth)
      })
      .catch(error => {
        console.error('Error sending password reset email', error);
      });
  }
/*
  signIn(email: string, password: string,name:any,profilepic:any) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
          this.dataService.userId = email
          this.dataService.userName = name
           this.dataService.userProfilePic = profilepic
        console.log('Signed in')
      })
      .catch(error => console.error('Sign-in error', error));
  }*/
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => console.log('User created'))
      .catch(error => console.error('Sign-up error', error));
  }

  signOut() {
    signOut(this.auth)
      .then(() => console.log('Signed out'))
      .catch(error => console.error('Sign-out error', error));
  }
}
