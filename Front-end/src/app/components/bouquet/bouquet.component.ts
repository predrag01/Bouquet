import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Bouquet } from 'src/app/models/bouquet';
import { ShoppingCartDto } from 'src/app/models/shopping-cart';
import { FloverShop } from 'src/app/models/store';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.scss']
})
export class BouquetComponent implements OnInit{
  
  @Input() bouquet: Bouquet | null= null;
  @Output() onClick: EventEmitter<ShoppingCartDto> = new EventEmitter<ShoppingCartDto>

  number = new FormControl('', [Validators.required]);
  user: User | null = null;
  shop: FloverShop | null = null;
  imgPath: string = environment.api;
  
  constructor( private store: Store<AppState>) {}

  ngOnInit(): void {
    this.number.setValue("1");
    this.store.subscribe((state) => {
      this.shop=state.shop.oneShop,
      this.user=state.user.user
    });
  };

  orderEmit() {
    if(this.bouquet && this.number.value) {
      const cart: ShoppingCartDto = {
        bouquet: this.bouquet,
        count: parseInt(this.number.value),
        buyer: this.user,
        shop: this.shop
      }
      this.onClick.emit(cart);
    }
  };

}
