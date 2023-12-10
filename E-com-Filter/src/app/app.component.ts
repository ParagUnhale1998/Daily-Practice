import { Component } from '@angular/core';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-commerce-Filters';

  products!: any[];
  uniqueCategories: string[] = [];
  filteredProducts: any[] = [];
  sliderValue: number = 0;

  minSize: number = 0;
  maxSize: number = 1000000;
  constructor(private productService: APIService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data
      console.log(data)
      this.uniqueCategories = [...new Set(this.products.map((p) => p.category))];
      // this.uniqueCategories = [...new Set(this.products.map((p) => p.category.name))];

      this.uniqueCategories.unshift('All');
      this.filterProducts('All');
    });
  

  }
  updateFilter(): void {
 
    this.filterProducts('All'); // Reset category filter
  }

  filterProducts(category: string): void {
    if (!this.minSize && this.minSize !== 0 || this.minSize == null) {
      this.minSize = 0;
    }
    // Set default value only if maxSize is blank or undefined
    if (!this.maxSize && this.maxSize !== 0 || this.maxSize == null) {
      this.maxSize = 1000000;
    }

    if (category === 'All') {
      // Show all products
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on category
      this.filteredProducts = this.products.filter(
        (product) => 
        // product.category.name === category &&
        // product.price >= this.minSize &&
        // product.price <= this.maxSize
        product.category === category &&
        product.price >= this.minSize &&
        product.price <= this.maxSize
      );
      console.log(this.filteredProducts)
    }
  }
}
