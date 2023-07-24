import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LearningAngularComponent } from './learning-angular/learning-angular.component';
import { DataBinding1LearningComponent } from './data-binding1-learning/data-binding1-learning.component';
import { Components1LearningComponent } from './components1-learning/components1-learning.component';
import { Directive3LearningComponent } from './directive3-learning/directive3-learning.component';
import { Services4LearningComponent } from './services4-learning/services4-learning.component';
import { SignUpComponent } from './students/sign-up/sign-up.component';
import { StudentsRoutingModule } from './students/students-routing.module';
import { Forms4LearningComponent } from './forms4-learning/forms4-learning.component';
import { AngularFundamentalsUdemyComponent } from './angular-fundamentals-udemy/angular-fundamentals-udemy.component';
import { LifeCycleHook5LearningComponent } from './life-cycle-hook5-learning/life-cycle-hook5-learning.component';
import { AngularPostUdemyComponent } from './angular-post-udemy/angular-post-udemy.component';
import { ChildComponent } from './child/child.component';
import { DecoratorsComponent } from './decorators/decorators.component';
import { ApiLearning6Component } from './api-learning6/api-learning6.component';
import { RxjsLearningComponent } from './rxjs-learning/rxjs-learning.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LearningAngularComponent,
    DataBinding1LearningComponent,
    Components1LearningComponent,
    Directive3LearningComponent,
    Services4LearningComponent,
    SignUpComponent,
    Forms4LearningComponent,
    AngularFundamentalsUdemyComponent,
    LifeCycleHook5LearningComponent,
    AngularPostUdemyComponent,
    ChildComponent,
    DecoratorsComponent,
    ApiLearning6Component,
    RxjsLearningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   FormsModule,
   StudentsRoutingModule,
   ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
