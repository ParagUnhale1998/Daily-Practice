import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular_project';
  count: number = 0;

  handleIncrement() {
    this.count++
  }

  handleDecrement() {
    this.count--;
  }
  handleReset(){
    this.count = 0;
  }
}
