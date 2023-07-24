import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular_practise ';
  
  constructor(private router:Router){

  }
  directive(){
    this.router.navigateByUrl('directive')
  }
  servicess(){
      this.router.navigateByUrl('services')
  }
  forms(){
    this.router.navigateByUrl('forms')
  }
  AngularFundamentals(){
    this.router.navigateByUrl('AngularFundamentals')
  }
  lifeCycleHook(){
    this.router.navigateByUrl('lifeCycleHook')
  }
  api(){
    this.router.navigateByUrl('api')
  }
}

