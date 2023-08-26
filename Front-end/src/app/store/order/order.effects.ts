import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "src/app/services/order.service";
import * as OrderActions from './order.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { Order } from "src/app/models/order";

@Injectable()
export class OrderEffects {
    constructor( private actions$: Actions, private orderService: OrderService, private snackbar: MatSnackBar) {}

    loadFilteredOrders$ = createEffect(() =>
    this.actions$.pipe(
        ofType(OrderActions.loadFilteredOrders),
        mergeMap(({ shopId, filter }) => this.orderService.getFilteredOrders(shopId, filter).pipe(
            map(( orders: Order[]) => OrderActions.loadFilteredOrdersSuccess({ orders: orders })),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
}