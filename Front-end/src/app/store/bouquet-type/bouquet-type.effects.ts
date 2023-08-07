import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BouquetTypeService } from "src/app/services/bouquet-type.service";
import * as TypeActions from './bouquet-type.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { BouquetType } from "src/app/models/bouquet-type";

@Injectable()
export class BouquetEffects {

    constructor(private actions$: Actions, private typeService: BouquetTypeService, private snackbar: MatSnackBar) { }

    addType$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TypeActions.addtype),
        mergeMap(({bouquetType}) => this.typeService.addType(bouquetType).pipe(
            map(( bouquetType: BouquetType) => TypeActions.addTypeSuccess({ bouquetType})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        )))
    );

    loadTypes$ = createEffect(() =>
    this.actions$.pipe(
        ofType(TypeActions.loadTypes),
        mergeMap(() => this.typeService.getAll().pipe(
            map((types) => (TypeActions.loadTypeListSuccess({types})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            }))
            )
        ))
    );

    deleteType$= createEffect(()=>
    this.actions$.pipe(
        ofType(TypeActions.deleteType),
        mergeMap(({ id }) => this.typeService.deleteType(id).pipe(
            map(() => TypeActions.deleteTypeSuccess({id}),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
    );

    updateType$= createEffect(() =>
    this.actions$.pipe(
        ofType(TypeActions.updateType),
        mergeMap(({bouquetType}) => this.typeService.updateType(bouquetType).pipe(
            map(() => TypeActions.updateTypeSuccess({id:bouquetType.id, name:bouquetType.type}),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            }))
        ))
    ));

}