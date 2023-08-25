import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { User } from 'src/app/models/user';
import { deleteShoppingCart, loadMyCart } from 'src/app/store/shopping-cart/shopping-cart.actions';
import { loadShoppingCart } from 'src/app/store/shopping-cart/shopping-cart.selector';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  user: User | null = null;
  shoppingCarts$: Observable<ShoppingCart[]> = of([]);
  total: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => this.user = state.user.user);
    this.store.dispatch(loadMyCart({ userId: <number>this.user?.id}));
    this.shoppingCarts$= this.store.select(loadShoppingCart);

    this.shoppingCarts$.subscribe(cartItems => {
      this.total= cartItems.reduce((sum, cartItem) => sum + (cartItem.count * cartItem.bouquet.price), 0);
    });
  }

  remove(cartId: number) {
    this.store.dispatch(deleteShoppingCart({cartId: cartId}));
  }
}
