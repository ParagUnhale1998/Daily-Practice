import { Component } from '@angular/core';
// import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotel-booking';
  // showLoader: boolean = false;
  
  // constructor(private router: Router) {}

  // ngOnInit() {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       this.showLoader = true;
  //     } else if (event instanceof NavigationEnd) {
  //       // Set a timeout to simulate the loader for demonstration purposes
  //       setTimeout(() => {
  //         this.showLoader = false;
  //       }, 1); // Adjust the timeout as needed
  //     }
  //   });
  // }
}