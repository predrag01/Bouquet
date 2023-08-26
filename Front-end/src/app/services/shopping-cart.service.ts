import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart, ShoppingCartDto } from '../models/shopping-cart';
import { environment } from 'src/environments/environment';
import { Order, OrderDto } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }

  addToShoppingCart(cart: ShoppingCartDto)
  {
    return this.httpClient.post<ShoppingCart>(environment.api + "/shopping-cart", cart);
  };

  loadMyShoppingCart(userId: number) {
    return this.httpClient.get<ShoppingCart[]>(environment.api + "/shopping-cart/" + userId);
  };

  updateCount(cart: ShoppingCart) {
    return this.httpClient.put<ShoppingCart>(environment.api + "/shopping-cart", cart);
  };

  deleteShoppingCart(cartId: number) {
    return this.httpClient.delete<any>(environment.api + "/shopping-cart/" + cartId);
  };

  makeOrder(order: OrderDto, carts: ShoppingCart[]) {
    const param = { order, carts }
    return this.httpClient.post<Order>(environment.api + "/shopping-cart/make-order", param);
  };
}
