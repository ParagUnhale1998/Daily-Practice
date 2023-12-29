import { Component ,HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hamburgerIsTrue :boolean = false
  // isSticky: boolean = false;

  // @HostListener('window:scroll', ['$event'])
  // handleScroll() {
  //   const scrollPosition =  window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   this.isSticky = scrollPosition >= 500; // Adjust the scroll height threshold as needed
  // }
}
