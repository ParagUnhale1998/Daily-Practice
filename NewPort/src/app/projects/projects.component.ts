import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit{
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

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.showNextImage();
    }, 2000); // Change the interval as needed (milliseconds)
  }

  showNextImage() {
    this.currentImageIndexTravel = (this.currentImageIndexTravel + 1) % this.travelWebsite.length;
    this.currentImageIndexRecipe = (this.currentImageIndexRecipe + 1) % this.recipeWebsite.length;
}

}
//   showingProjects : any;

//   transitioning: boolean = true;

//   projects = [
//     {
//       image: '../assets/projects/Project 1.png',
//       title: 'Hotel Management',
//     },
//     {
//       image: '../assets/projects/Project 2.png',
//       title: 'Food App',
//     },
//     {
//       image: '../assets/projects/Project 3.png',
//       title: 'Socail MEdia ',
//     },
//     {
//       image: '../assets/projects/Project 3.png',
//       title: 'Static Websites',
//     },
//     {
//       image: '../assets/projects/Project 5.png',
//       title: 'Static Websites',
//     },
//     {
//       image: '../assets/projects/Project 1.png',
//       title: 'Static Websites',
//     }
//   ]

//   ngOnInit(): void {
//     this.showProjects(0,2)

//   }
//   showProjects(num1:number,num2:number){
//     this.transitioning = true;
//     setTimeout(() => {
//       this.showingProjects = this.projects.slice(num1, num2);
//       this.transitioning = false;
//     }, 300);  }
// }
