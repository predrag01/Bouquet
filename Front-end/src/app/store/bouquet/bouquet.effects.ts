import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BouquetService } from "src/app/services/bouquet.service";
import * as BouquetActions from './bouquet.actions'
import { catchError, map, mergeMap, of } from "rxjs";
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
    ))    
}