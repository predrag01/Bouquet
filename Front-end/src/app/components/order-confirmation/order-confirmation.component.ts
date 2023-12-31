import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Status } from 'src/app/enums/status';
import { Bouquet } from 'src/app/models/bouquet';
import { City } from 'src/app/models/city';
import { OrderDto } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { User } from 'src/app/models/user';
import { loadMyCart, makeOrder } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { loadShoppingCart } from 'src/app/store/shopping-cart/shopping-cart.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit{

  message=new FormControl('');
  address=new FormControl('', [Validators.required]);
  dateToDelivery= new FormControl(null, [Validators.required]);
  
  user: User | null = null;
  shoppingCarts$: Observable<ShoppingCart[]> = of([]);
  total: number = 0;
  imgPath: string = environment.api;

  constructor(private router: Router, private store: Store<AppState>){}
  
  ngOnInit(): void {
    this.store.subscribe((state) => this.user = state.user.user);
    this.store.dispatch(loadMyCart({ userId: <number>this.user?.id}));
    this.shoppingCarts$= this.store.select(loadShoppingCart);

    this.shoppingCarts$.subscribe(cartItems => {
      this.total= cartItems.reduce((sum, cartItem) => sum + (cartItem.count * cartItem.bouquet.price), 0);
    });
  }

  payment() {
    const shoppingCarts: ShoppingCart[] = [];
    const orders: OrderDto[] = [];
    this.shoppingCarts$.subscribe(cartItems => {
      cartItems.forEach(cartItem => {
        shoppingCarts.push(cartItem);

        const order: OrderDto = {
          bouquet: cartItem.bouquet,
          count: cartItem.count,
          totalPrice: this.total,
          message: this.message.value,
          city: <City>this.user?.city,
          address: <string>this.address.value,
          dateToDelivery: this.dateToDelivery.value,
          dateOfOrder: new Date(),
          status: Status.NotAccepted,
          buyer: <User>this.user,
          shop: cartItem.shop
        };

        orders.push(order);
      });
    });

    this.store.dispatch(makeOrder({ orders: orders, carts: shoppingCarts}));

    this.router.navigate(['home']);
  }
}
