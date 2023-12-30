import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import * as Aos from 'aos';
import Aos from 'aos';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeRight', [
      state('void', style({ opacity: 0, transform: 'translateX(-20px)' })),
      transition(':enter', animate('1000ms ease-in-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppComponent implements OnInit {
  title = 'Parag Unhale';
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ]
    images!: any[];
  // nav ts code 
  hamburgerIsTrue :boolean = false
  
  hideHamvurger(){
    this.hamburgerIsTrue = !this.hamburgerIsTrue
  }
 
  constructor(private primengConfig: PrimeNGConfig){

  }

  ngOnInit(): void {
    this.scrollEvenetsOnClick()
    Aos.init({
      easing: 'ease-in-out',
      once: false,
      delay: 200
    });

    this.startSlideshow();

        setInterval(() => {
      this.showNextTestimonial();
      Aos.refresh();
    }, 3000); // Switch testimonials every 5 seconds

    //ng prime cursoul
    this.images = this.travelWebsite.map((itemImageSrc, index) => {
      return {
        itemImageSrc,
        thumbnailImageSrc: itemImageSrc, // You can customize this based on your thumbnail logic
        alt: `Image ${index + 1}`,
      };
    });

    // Call the init method to make responsiveOptions work
    this.primengConfig.ripple = true;
  }
    //hero Section Ts
    openLinkedInProfile(): void {
      window.open('https://www.linkedin.com/in/parag-unhale', '_blank');
    }
    openGithubProfile(): void {
      window.open('https://github.com/ParagUnhale1998', '_blank');
    }
    openTwitterProfile(): void {
      window.open('https://twitter.com/paragunhale1998', '_blank');
    }
   
    //about ts code
    currentSection: 'personal' | 'qualifications' | 'skills' = 'personal';
    showSection(section: 'personal' | 'qualifications' | 'skills') {
      this.currentSection = section;
      Aos.refresh();
    }

    //project ts code 
    travelWebsite: string[] = [
      '../assets/projects/TravelWebsite/1.jpg',
      '../assets/projects/TravelWebsite/2.jpg',
      '../assets/projects/TravelWebsite/3.png',
      '../assets/projects/TravelWebsite/4.png',
      '../assets/projects/TravelWebsite/5.png',
      '../assets/projects/TravelWebsite/6.png',
      '../assets/projects/TravelWebsite/7.png',
      '../assets/projects/TravelWebsite/8.png',
      '../assets/projects/TravelWebsite/9.png',
      '../assets/projects/TravelWebsite/10.png',
      '../assets/projects/TravelWebsite/12.jpg',
      '../assets/projects/TravelWebsite/13.png',
  
    ];
    recipeWebsite: string[] = [
      '../assets/projects/RecipeWebsite/1.png',
      '../assets/projects/RecipeWebsite/2.png',
      '../assets/projects/RecipeWebsite/3.png',
      '../assets/projects/RecipeWebsite/4.png',
      '../assets/projects/RecipeWebsite/5.png',
    ];
    currentImageIndexTravel: number = 0
    currentImageIndexRecipe: number = 0
  
    // ngOnInit() {
    //   this.startSlideshow();
    // }
  
    startSlideshow() {
      setInterval(() => {
        this.showNextImage();
        Aos.refresh();
      }, 2000); // Change the interval as needed (milliseconds)
    }
  
    showNextImage() {
      this.currentImageIndexTravel = (this.currentImageIndexTravel + 1) % this.travelWebsite.length;
      this.currentImageIndexRecipe = (this.currentImageIndexRecipe + 1) % this.recipeWebsite.length;
  }

  //service Ts code 
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

  // ngOnInit(): void {
  //   setInterval(() => {
  //     this.showNextTestimonial();
  //   }, 3000); // Switch testimonials every 5 seconds

  // }

  showNextTestimonial() {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
    Aos.refresh();
  }

  //
  scrollEvenetsOnClick(){
    const scrollElements = document.querySelectorAll('.scroll');

    // Add click event listener to each element
    scrollElements.forEach(element => {
      element.addEventListener('click', () => {
        // Get the target element's ID from the data-scroll attribute
        const targetId = element.getAttribute('data-scroll') || '';

        // Scroll to the target element with smooth behavior
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}
