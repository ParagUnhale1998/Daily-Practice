import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-data-binding1-learning',
  templateUrl: './data-binding1-learning.component.html',
  styleUrls: ['./data-binding1-learning.component.css']
})
export class DataBinding1LearningComponent {

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
}
