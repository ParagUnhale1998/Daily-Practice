import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
// import { find } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  allHotels:any[] = [];
  hotelData:any;
  userData: any;;
  hotelId:any;
  constructor(private route: ActivatedRoute,private service:UserService){}
 
  ngOnInit(): void {
    this.getUserData()
    this.getHotelData()
    // this.route.queryParams.subscribe((params) => {
    //   const ownerId = params['ownerId'];
    //   const hotelId = params['hotelId'];
    //   this.hotelId = hotelId
    // });
    this.service.cartData$.subscribe((data) => {
      if (data) {
        const ownerId = data.ownerId;
        const hotelId = data.hotelId;
          this.hotelId = hotelId

      }
    });
  
  }
   
  getUserData(){
    const userId = this.service.userId
    this.service.getUserByCode(userId).subscribe(data => {
      this.userData = data
      console.log(this.userData)
    })
  }

  getHotelData(){
    this.service.getHotelList().subscribe(((data:any) => {
      this.allHotels = data
      console.log(this.allHotels)
      this.findHotel()
    }))
  }
  
  findHotel() {
    console.log(this.hotelId);
    // const id = 'AshokCountryResort'
    this.hotelData =  this.allHotels.find((hotel:any)=> {
      // console.log(hotel)
      return hotel.id === this.hotelId;
    })
    console.log(this.hotelData);
    this.addItemToCart()
  }


  addItemToCart() {
    const id = this.service.userId;
    if (id && this.hotelData) {
      //  const cartData = this.userData.cart
      const isAlreadyInCart = this.userData.cart.some((item: any) => item.id === this.hotelId);
      if (!isAlreadyInCart) {
       const newItem = {
        cart: [...this.userData.cart, this.hotelData]
       };
      this.userData.cart.push(this.hotelData)
      this.service.addToCart(id, newItem).subscribe((user) => {
        console.log('Cart updated:', user);
        // Perform any other actions or updates you need
      });
    }else{
      alert('Hotel is already in the cart.');
    }
  }
  }

  removeFromCart(hotelId:any){
    
    const id = this.service.userId;
    const cartItemIndex = this.userData.cart.findIndex((hotel:any) => hotel.id == hotelId)
  //  this.userData =  this.userData.cart.filter((hotel:any) => hotel.id !== hotelId)
  if(cartItemIndex !== -1){
    this.userData.cart.splice(cartItemIndex, 1);
    const updateCart = {
      cart: [...this.userData.cart]
    };
    this.service.removeFromCart(id,updateCart).subscribe((user:any) => {
      console.log('Cart Item Deleted:',user)
    })
  }
  // const newItem = {
  //   cart: [...this.userData.cart]
  // };
  // this.service.addToCart(id, newItem).subscribe((user) => {
  //   console.log('Cart item Deleted:', user);
  // });
  }

  
}
