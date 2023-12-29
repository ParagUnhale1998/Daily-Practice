import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{
  currentTestimonialIndex = 0;

  testimonials = [
    {
      image: '../assets/services4.png',
      title: 'Static Websites',
      content: 'We make static websites with beautiful landing pages, ensuring fast responsiveness and better user experience.'
    },
    {
      image: '../assets/services1.png',
      title: 'Dynamic Websites',
      content: 'We create dynamic website pages and functionality to make websites awesome, fast, and provide a smooth user experience.'
    },
    {
      image: '../assets/services.png',
      title: 'Bug Fixes',
      content: 'We fix bugs in websites within our tech stack, addressing issues like responsive design glitches and form validation to seamless API integrations.'
    }
  ];

  ngOnInit(): void {
    setInterval(() => {
      this.showNextTestimonial();
    }, 3000); // Switch testimonials every 5 seconds

  }

  showNextTestimonial() {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }
}
