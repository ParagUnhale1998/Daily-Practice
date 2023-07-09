import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-routing1',
  templateUrl: './routing1.component.html',
  styleUrls: ['./routing1.component.css']
})
export class Routing1Component {
  // 2 way routing using t file
  constructor(private router:Router){

  }
  loginComponent() {
  this.router.navigateByUrl("/login")
  }

  studentSignup() {
    this.router.navigateByUrl("students/studentSignUp")
    }
    studentLogin(){
      this.router.navigateByUrl("students/studentLogIn")
    }
}
