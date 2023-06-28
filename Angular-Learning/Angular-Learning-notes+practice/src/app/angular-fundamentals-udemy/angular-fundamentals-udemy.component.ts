import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-angular-fundamentals-udemy',
  templateUrl: './angular-fundamentals-udemy.component.html',
  styleUrls: ['./angular-fundamentals-udemy.component.css'],
})
export class AngularFundamentalsUdemyComponent {
  name = 'parag';
  imgURL = 'https://picsum.photos/id/5/500/500';
  currentDate = new Date();
  cost = 2000;
  temperature = 25.5;
  jsonPipe = {
    language: ['html', 'css', 'javascript', 'nodejs'],
    review: 'very good',
  };
  numItems: number = 5;
  data$: Observable<string>;

  blueClass = false;
  fontsize = 20;
  constructor() {
    this.data$ = of('Data from an asynchronous source');
  }
  changeImage(e: KeyboardEvent): void {
    // Type Asseration method
    this.imgURL = (e.target as HTMLInputElement).value;
  }
  /* use this or this 
changeImage(e:any){
this.imgURL =e.target.value
} */

  logImg(event: string) {
    console.log(event);
  }
}
