import { Component, OnInit } from '@angular/core';
// import * as AOS from 'aos';
// import 'aos/dist/aos.css';
import Aos from 'aos';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit{
  openLinkedInProfile(): void {
    window.open('https://www.linkedin.com/in/parag-unhale', '_blank');
  }
  openGithubProfile(): void {
    window.open('https://github.com/ParagUnhale1998', '_blank');
  }
  openTwitterProfile(): void {
    window.open('https://twitter.com/paragunhale1998', '_blank');
  }

ngOnInit(): void {
  Aos.init({
    easing: 'ease-in-out',
    once: true,
    delay: 200 // Corrected property name
  });
  }  
}
