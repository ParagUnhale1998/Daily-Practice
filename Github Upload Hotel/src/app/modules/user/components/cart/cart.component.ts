import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userData: any;
  hotelData: any; // Assuming you have hotel data available in your component
  hotelId: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cartService: CartService,
    private dataService :DataSharingService,
  ) {}

  ngOnInit(): void {
    this.getUserData()
    this.route.queryParams.subscribe((params) => {
      const hotelId = params['hotelId'];
      this.hotelId = hotelId;
    });
    this.getHotelData()
  }

  getUserData() {
    const userId = this.dataService.userEmail // Replace with your user ID
    console.log(userId)
    this.userService.getUserByEmail(userId).subscribe((data) => {
      this.userData = data;
      console.log(this.userData);

    });
  }

  getHotelData() {
    this.cartService.getHotelById(this.hotelId).subscribe(data => {
      this.hotelData = data
      this.addItemToCart()
    })
  }

  addItemToCart() {
    if (this.userData && this.hotelData) {
      const isAlreadyInCart = this.cartService.getCartItems().some(
        (item: any) => item.id === this.hotelData.id
      );
      if (!isAlreadyInCart) {
        this.cartService.addToCart(this.hotelData);
        this.patchUserCart();
      } else {
        alert('Hotel is already in the cart.');
      }
    }
  }

  removeFromCart(hotelId: any) {
    this.cartService.removeFromCart(hotelId);
    this.patchUserCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.patchUserCart();
  }

  patchUserCart() {
    const updatedCart = this.cartService.getCartItems();
    this.cartService.patchUserCart(this.userData.id, updatedCart).subscribe(() => {
      console.log('User cart updated successfully');
    });
  }
}