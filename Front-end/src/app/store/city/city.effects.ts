import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CityService } from "src/app/services/city.service";
import * as CityActions from './city.actions'
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class CityEffects {

    constructor(private actions$: Actions, private cityService: CityService) { }

    loadCities$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CityActions.loadCities),
        mergeMap(() => this.cityService.getAll().pipe(
            map((cities) => (CityActions.loadCitiesSuccess({cities: cities})),
            catchError( () => of({type: 'Load error'})))
        ))
    ));
}