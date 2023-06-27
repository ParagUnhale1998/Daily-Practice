import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { LearningAngularComponent } from './learning-angular/learning-angular.component';
import { SignUpComponent } from './students/sign-up/sign-up.component';
import { LogInComponent } from './students/log-in/log-in.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'root', component: AppComponent },
  { path: 'LearningAngular', component: LearningAngularComponent },
  {path:'studentLogin', component : LogInComponent },
  {path:'studentSignUp', component : SignUpComponent },
  {path:'students',loadChildren : () => import('../app/students/students.module').then(mod => mod.StudentsModule ) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
