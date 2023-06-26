import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_project';
  // for declare the propert using dataTypes
  username : String = "Parag Unhale"; // property name  : data Type = value / data  
  // or
  firstname = "parag"
  // or
  // for first Declare then Some time we stored the value in / OPTIONAL SYMBOL !
  lastName! : String ;
  // or
  // it means any dataTypes ara allowerd
  surName : any;

  formTitle : String = "Login Form"
  password : string = "Login12345"

}

/*data Binding in Angular 
 two types 
1) one way data binding =>
 1. string interpolation:{{}}
2) two way data binding 
*/