import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "src/app/services/order.service";
import * as OrderActions from './order.actions'
import { catchError, map, merge, mergeMap, of } from "rxjs";
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
    ));

    changeStatus$ = createEffect(() =>
    this.actions$.pipe(
        ofType(OrderActions.changeStatusToOrder),
        mergeMap(({ orderId, status }) => this.orderService.updateStatus(orderId, status).pipe(
            map(() => {
               this.snackbar.open("Successfully updated order status", "Ok", { duration: 3000});
                return OrderActions.changeStatusToOrderSuccess({ order: orderId });
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadOrderForDelivery$ = createEffect(() =>
    this.actions$.pipe(
        ofType(OrderActions.loadOrdersReadyToDelivery),
        mergeMap(({ cityId }) => this.orderService.getOrdersForDelivery(cityId).pipe(
            map((orders: Order[]) => OrderActions.loadOrdersReadyToDeliverySuccess({ orders }))
        )),
        catchError( ({error}) => {
            this.snackbar.open(error, 'Close', { duration: 3000});
            return  of({type: 'Load error'});
        })
    ));

    loadOrderFilteredByDeliveryGuy$ = createEffect(() =>
    this.actions$.pipe(
        ofType(OrderActions.loadOrdersFilteredByDeliveryGug),
        mergeMap(({ deliveryGuyId, status }) => this.orderService.getOrdersByDeliveryGuy(deliveryGuyId, status).pipe(
            map(( orders: Order[]) => OrderActions.loadOrdersFilteredByDeliveryGugSuccess({ orders }))
        )),
        catchError( ({error}) => {
            this.snackbar.open(error, 'Close', { duration: 3000});
            return  of({type: 'Load error'});
        })
    ));

    acceptForDelivery$ = createEffect(() =>
    this.actions$.pipe(
        ofType(OrderActions.acceptForDelivery),
        mergeMap(({ orderId, deliveryGuyId }) => this.orderService.acceptForDelivery(orderId, deliveryGuyId).pipe(
            map(( ) => {
               this.snackbar.open("Successfully updated order status", "Ok", { duration: 3000});
                return OrderActions.acceptForDeliverySuccess({ orderId });
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));
}