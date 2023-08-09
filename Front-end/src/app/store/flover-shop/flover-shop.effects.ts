import { Injectable } from "@angular/core";
import * as ShopActions from './flover-shop.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FloverShopService } from "src/app/services/flover-shop.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class FloverShopEffects {
    
    constructor(private actions$: Actions, private shopService: FloverShopService, private snackBar: MatSnackBar) {}

    createShop$ = createEffect(() => 
    this.actions$.pipe(
        ofType(ShopActions.createShop),
        mergeMap(({ formData }) => this.shopService.create(formData).pipe(
            map((shop) => {
                this.snackBar.open("Store successfully created", "Ok", { duration: 3000 })
                return ShopActions.createShopSuccess({ shop: shop })
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadMyStores$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.loadMyStoreList),
        mergeMap(({ id }) => this.shopService.getMyStores(id).pipe(
            map((stores) => ShopActions.loadMyStoreListSuccess({ shops: stores})),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    deleteStore$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.deleteStore),
        mergeMap(({ id }) => this.shopService.deleteStore(id).pipe(
            map(() => {
                this.snackBar.open("Store successfully deleted", "Ok", { duration: 3000 })
                return ShopActions.deleteStoreSuccess({ id: id })
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
}