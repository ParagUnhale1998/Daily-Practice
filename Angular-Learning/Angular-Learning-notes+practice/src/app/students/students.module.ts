import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
// import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [
    // SignUpComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
  // , aavoid this
  // exports: [
  //   SignUpComponent,
  //   LogInComponent
  // ]
  
})
export class StudentsModule { }
