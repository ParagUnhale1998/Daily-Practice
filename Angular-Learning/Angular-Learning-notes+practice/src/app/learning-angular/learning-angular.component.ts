import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-learning-angular',
  templateUrl: './learning-angular.component.html',
  styleUrls: ['./learning-angular.component.css']
})
export class LearningAngularComponent {
  // 2 way routing using t file
  constructor(private router:Router){

  }
  loginComponent() {
  this.router.navigateByUrl("/login")
  }
  
// for declare the propert using dataTypes
username: String = 'Parag Unhale'; // property name  : data Type = value / data
// or
firstname = 'parag';
// or
// for first Declare then Some time we stored the value in / OPTIONAL SYMBOL !
lastName!: String;
// or
// it means any dataTypes ara allowerd
surName: any;

formTitle: String = 'Login Form';
password: string = 'Login12345';
gender: boolean = false;
isDisable: boolean = false;
twoWayBInding:Number =21312;
testingEventBinding() {
  this.username = 'Starboy Unhale';
  this.gender = true;
  this.isDisable = true;
}

testingInterpolation(a: any, b: any) {
  return a + b;
}


// count: number = 0;

// handleIncrement() {
//   this.count++
// }

// handleDecrement() {
//   this.count--;
// }
// handleReset(){
//   this.count = 0;
// }
}
