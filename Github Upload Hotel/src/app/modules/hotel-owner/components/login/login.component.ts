import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignUp = false;

  toggleSection() {
    this.showSignUp = !this.showSignUp;
  }
  generateFakeLoop(count: number): number[] {
    return new Array(count).fill(0).map((_, index) => index);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true, 
    autoplayTimeout: 2000,
  autoplaySpeed: 800,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      800: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
}
