import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import * as CartActions from './shopping-cart.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { ShoppingCart } from "src/app/models/shopping-cart";
import { Order } from "src/app/models/order";

@Injectable()
export class ShoppingCartEffects {
    constructor( private actions$: Actions, private cartService: ShoppingCartService, private snackbar: MatSnackBar) {}

    addToShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CartActions.addToCart),
        mergeMap(({ order }) => this.cartService.addToShoppingCart(order).pipe(
            map(( cart: ShoppingCart ) => {
                this.snackbar.open("Added to shopping cart", "Close", {duration: 3000});
                return CartActions.addToCartSuccess({ order: cart });
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    getMyShoppingCart$ = createEffect(()=>
    this.actions$.pipe(
        ofType(CartActions.loadMyCart),
        mergeMap(({ userId }) => this.cartService.loadMyShoppingCart(userId).pipe(
            map(( shoppingCarts: ShoppingCart[] ) => CartActions.loadMyCartSuccess({ shoppingCarts })),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    updateCount$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CartActions.updateCount),
        mergeMap(({ shoppingCart}) => this.cartService.updateCount(shoppingCart).pipe(
            map(() => CartActions.updateCountSuccess({ shoppingCart })),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    deleteShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CartActions.deleteShoppingCart),
        mergeMap(({ cartId }) => this.cartService.deleteShoppingCart(cartId).pipe(
            map(() => CartActions.deleteShoppingCartSuccess({ cartId })),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    makeOrder$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CartActions.makeOrder),
        mergeMap(({ order, carts }) => this.cartService.makeOrder(order, carts).pipe(
            map(() => {
                console.log(order.dateToDelivery)
                this.snackbar.open("Order successfuly", "Ok", {duration: 3000});
                return CartActions.orderSuccess({ carts: carts });
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
}