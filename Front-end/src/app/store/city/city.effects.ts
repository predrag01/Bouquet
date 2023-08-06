import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CityService } from "src/app/services/city.service";
import * as CityActions from './city.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { City, CityDto } from "src/app/models/city";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CityEffects {

    constructor(private actions$: Actions, private cityService: CityService, private snackbar: MatSnackBar) { }

    loadCities$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CityActions.loadCities),
        mergeMap(() => this.cityService.getAll().pipe(
            map((cities) => (CityActions.loadCitiesSuccess({cities: cities})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            }))
        ))
    ));

    addCity$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CityActions.addCity),
        mergeMap(({city}) => this.cityService.addCity(city).pipe(
            map((city: City)=> CityActions.addCitySuccessfully({ city})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    deleteCity$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CityActions.deleteCity),
        mergeMap(({ id }) => this.cityService.deleteCity(id).pipe(
            map(() => CityActions.deleteCitySuccess({id})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    updateCity$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CityActions.updateCity),
        mergeMap(({ city }) => this.cityService.updateCity(city).pipe(
            map(() => CityActions.updateCitySuccess({ id: city.id, name: city.city})),
            catchError( ({error}) => {
                this.snackbar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));
}