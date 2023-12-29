import { Component } from '@angular/core';
// import Aos from 'aos';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  currentSection: 'personal' | 'qualifications' | 'skills' = 'personal';

  showSection(section: 'personal' | 'qualifications' | 'skills') {
    this.currentSection = section;
  }

  ngOnInit(): void {
    // Aos.init({
    //   easing: 'ease-in-out',
    //   once: true,
    //   delay: 200 // Corrected property name
    // });
    }  
}
