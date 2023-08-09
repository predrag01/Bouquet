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
    ))
}