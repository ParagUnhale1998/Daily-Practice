/*import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userData: any;
  hotelData: any; // Assuming you have hotel data available in your component
  hotelId: any;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cartService: CartService,
    private dataService :DataSharingService,
    private toster :TosterMessageService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.route.queryParams.subscribe((params) => {
      this.hotelId = params['hotelId']; // Convert the parameter to a number
      console.log(this,this.hotelId)
      this.getHotelData();
    });
  }

  getUserData() {
    const userId = this.dataService.userEmail; // Replace with your user ID
    console.log(userId);
    
    this.userService.getUserByEmail(userId).subscribe((data) => {
      this.userData = data;
      this.cartItems = data.cart
      console.log(this.userData);
    });
  }

  getHotelData() {
    this.cartService.getHotelById(this.hotelId).subscribe(data => {
      this.hotelData = data
      console.log(this.hotelData)
      this.addItemToCart()
    })
  }

  addItemToCart() {
    this.cartService.addToCart(this.cartItems, this.hotelData).subscribe(
      (response) => {
        this.cartItems = response.cart;
        this.toster.showSuccess('Item added to cart successfully!', 'success');
      },
      (error) => {
        this.toster.showError('Failed to add item to cart.', 'error');
      }
    );
  }


  removeItemFromCart(hotelID: any) {
    this.cartService.removeFromCart(this.cartItems, hotelID).subscribe(
      (response) => {
        this.cartItems = response.cart;
        this.toster.showSuccess('Item removed from cart successfully!', 'success');
      },
      (error) => {
        this.toster.showError('Failed to remove item from cart.', 'error');
      }
    );
  }

  navigateToBooking(hotel:any){
    this.router.navigate(['user/hotelDetails'], {
      queryParams: {hotelId: hotel.id },
    });
  }
}

*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userData: any;
  hotelData: any;
  hotelId: any;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cartService: CartService,
    private dataService: DataSharingService,
    private toster: TosterMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.route.queryParams.subscribe((params) => {
      this.hotelId = params['hotelId'];
      console.log(this.hotelId);
      this.getHotelData();
    });
  }

  getUserData(): void {
    const userId = this.dataService.userEmail;
    console.log(userId);
  
    this.userService.getUserByEmail(userId).subscribe({
      next: (data) => {
        this.userData = data;
        this.cartItems = data.cart;
        console.log(this.userData);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error, show a message to the user, or redirect
      }
    });
  }
  

  getHotelData(): void {
    this.cartService.getHotelById(this.hotelId).subscribe({
      next: (data) => {
        this.hotelData = data;
        console.log(this.hotelData);
        this.addItemToCart();
      },
      error: (error) => {
        console.error('Error fetching hotel data:', error);
        // Handle the error, show a message to the user, or redirect
      }
    });
  }
  

  addItemToCart(): void {
    this.cartService.addToCart(this.cartItems, this.hotelData).subscribe({
      next: (response) => {
        this.cartItems = response.cart;
        this.toster.showSuccess('Item added to cart successfully!', 'success');
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        this.toster.showError('Failed to add item to cart.', 'error');
      }
    });
  }
  

  removeItemFromCart(hotelID: any): void {
    this.cartService.removeFromCart(this.cartItems, hotelID).subscribe({
      next: (response) => {
        this.cartItems = response.cart;
        this.toster.showSuccess('Item removed from cart successfully!', 'success');
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
        this.toster.showError('Failed to remove item from cart.', 'error');
      }
    });
  }
  

  navigateToBooking(hotel: any) {
    this.router.navigate(['user/hotelDetails'], {
      queryParams: { hotelId: hotel.id },
    });
  }
}
