import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BouquetService } from "src/app/services/bouquet.service";
import * as BouquetActions from './bouquet.actions'
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { Bouquet } from "src/app/models/bouquet";

@Injectable()
export class BouquetTypeEffects {

    constructor(private actions$: Actions, private bouquetService: BouquetService, private snackbar: MatSnackBar) { }

    addBouquet$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BouquetActions.addBouquet),
        mergeMap(({ bouquet }) => this.bouquetService.addBouquet(bouquet).pipe(
            map(( bouquet: Bouquet ) => {
                this.snackbar.open("Successsfuly created bouquet", "Ok", {duration: 3000})
                return BouquetActions.addBouquetSuccess({ bouquet })
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    getBouquetList$ = createEffect(() =>
    this.actions$.pipe(
        ofType(BouquetActions.loadBouquetListByStoreId),
        mergeMap(({ shopId }) => this.bouquetService.getBouquetListByStoreId(shopId).pipe(
            map(( bouquets ) => BouquetActions.loadBouquetListByStoreIdSuccess({ bouquets })),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
    ))));

    deleteBouquet$= createEffect(() =>
    this.actions$.pipe(
        ofType(BouquetActions.deleteBouquet),
        mergeMap(({ bouquetId }) => this.bouquetService.deleteBouquet(bouquetId).pipe(
            map(() => {
                this.snackbar.open("Successfuly deleted bouquet", 'Ok', { duration: 3000})
                return BouquetActions.deleteBouquetSuccess({ bouquetId: bouquetId });
            }),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
}