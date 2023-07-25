import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { LearningAngularComponent } from './learning-angular/learning-angular.component';
// import { SignUpComponent } from './students/sign-up/sign-up.component';
// import { LogInComponent } from './students/log-in/log-in.component';
import { DataBinding1LearningComponent } from './data-binding1-learning/data-binding1-learning.component';
import { Components1LearningComponent } from './components1-learning/components1-learning.component';
import { Directive3LearningComponent } from './directive3-learning/directive3-learning.component';
import { Services4LearningComponent } from './services4-learning/services4-learning.component';
import { Forms4LearningComponent } from './forms4-learning/forms4-learning.component';
import { AngularFundamentalsUdemyComponent } from './angular-fundamentals-udemy/angular-fundamentals-udemy.component';
import { LifeCycleHook5LearningComponent } from './life-cycle-hook5-learning/life-cycle-hook5-learning.component';
import { ChildComponent } from './child/child.component';
import { ApiLearning6Component } from './api-learning6/api-learning6.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dataBinding', component: DataBinding1LearningComponent },
  { path: 'components', component: Components1LearningComponent },
  { path: 'directive', component: Directive3LearningComponent },
  { path: 'services', component: Services4LearningComponent },
  { path: 'forms', component: Forms4LearningComponent },
  { path: 'root', component: AppComponent },
  { path: 'LearningAngular', component: LearningAngularComponent },
  { path: 'AngularFundamentals', component: AngularFundamentalsUdemyComponent },
  { path: 'lifeCycleHook', component: LifeCycleHook5LearningComponent },
  { path: 'child', component: ChildComponent },
  { path: 'api', component: ApiLearning6Component },
  // {path:'studentLogin', component : LogInComponent },
  // {path:'', component : LearningAngularComponent },
  // {path:'studentSignUp', component : SignUpComponent },
  {path:'students',loadChildren : () => import('../app/students/students.module').then(mod => mod.StudentsModule ) },
  {path:'routing',loadChildren : () => import('../app/routing2-learning/routing2-learning.module').then(mod => mod.Routing2LearningModule ) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
