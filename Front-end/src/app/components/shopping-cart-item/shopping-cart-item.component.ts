import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { updateCount } from 'src/app/store/shopping-cart/shopping-cart.actions';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit{

  @Input() shoppingCart: ShoppingCart | null = null;
  
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  minus(){
    if(this.shoppingCart) {
      if(this.shoppingCart.count>1) {
        const cart: ShoppingCart ={
          ...this.shoppingCart,
          count: this.shoppingCart.count - 1
        };
        this.store.dispatch(updateCount({ shoppingCart: cart }));
      }
    }
  };

  plus(){
    if(this.shoppingCart) {
      const cart: ShoppingCart ={
        ...this.shoppingCart,
        count: this.shoppingCart.count + 1
      };
      this.store.dispatch(updateCount({ shoppingCart: cart }));
    }
  };
}
