import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './user/user.module';
import { ToastrModule } from 'ngx-toastr';
import {provideFirebaseApp,initializeApp} from '@angular/fire/app'
import {getFirestore,provideFirestore} from '@angular/fire/firestore'
import { getAuth, provideAuth} from '@angular/fire/auth';



const   firebaseConfig = {
  apiKey: "AIzaSyDaIfEelWZ13gCWHM6lWhp_kLQgrI3AiSQ",
  authDomain: "social-app-posts.firebaseapp.com",
  projectId: "social-app-posts",
  storageBucket: "social-app-posts.appspot.com",
  messagingSenderId: "514282961247",
  appId: "1:514282961247:web:fe085e1d2c4f0b51575eea"
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule,
    UserModule,
    ToastrModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule
    provideFirebaseApp(()=> initializeApp(firebaseConfig)),
    provideFirestore(()=> getFirestore()),
    provideAuth(()=> getAuth()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
