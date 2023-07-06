import { Component } from '@angular/core';

@Component({
  selector: 'app-directive3-learning',
  templateUrl: './directive3-learning.component.html',
  styleUrls: ['./directive3-learning.component.css'],
})
export class Directive3LearningComponent {
  // first declare porporty then construtor adn then lifecycle hook then normal function
  show = true;
  undefinedValue!: string; //undefined value is always false
  nullProperty = null;
  toggle: boolean = true;
  //  cars = ['lamborgini','ford','farrari','mustang']
  // only use array for this loop to show element like for loop
  cars: string[] = ['lamborgini', 'ford', 'farrari', 'mustang'];
  carHeading = ['brand', 'model', 'Price'];
  carDetails = [
    {
      brand: 'Toyota',
      model: 'Camry',
      value: 25000,
    },
    {
      brand: 'Honda',
      model: 'Accord',
      value: 28000,
    },
    {
      brand: 'Ford',
      model: 'Mustang',
      value: 35000,
    },
    {
      brand: 'Chevrolet',
      model: 'Camaro',
      value: 32000,
    },
    {
      brand: 'BMW',
      model: '3 Series',
      value: 40000,
    },
    {
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      value: 45000,
    },
    {
      brand: 'Audi',
      model: 'A4',
      value: 38000,
    },
    {
      brand: 'Lexus',
      model: 'RX',
      value: 42000,
    },
    {
      brand: 'Volkswagen',
      model: 'Golf',
      value: 27000,
    },
    {
      brand: 'Hyundai',
      model: 'Elantra',
      value: 22000,
    },
  ];

  numbers = [10, 20, 30, 40, [50, 60, 70]];
  nestedNumbers = this.numbers.flat();
 
  data = [1, 2, 3, 4, [5,6, 7, 8]];
  data2:any[] = [];
  data3:any[] = []; 
  color:Boolean = false;
  multiClass = 200;
  styleCss = 'yellow' ;
  switchValue = 600;
  constructor() {

  }

  ngOnInit() {
    this.data.forEach((item:any, index) => {
      if (index != 4) {
        this.data2.push(item);
      }else{
        this.data3 = [...item];
      }
    });
  
    // this.data.forEach((item: any, index) => {
    //   if (index == 4) {
    //     this.data3 = [...item];
    //   }
    // });
  }


  toggleEffect() {
    // value is true then false when valu is false then true this is not operator feature
    this.toggle = !this.toggle;
  }
  toggleEffect2() {
    this.color = !this.color;
  }
}
