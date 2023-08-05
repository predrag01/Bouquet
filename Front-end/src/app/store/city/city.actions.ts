import { createAction, props } from "@ngrx/store";
import { City } from "src/app/models/city";

export const loadCities = createAction ('Load cities');
export const loadCitiesSuccess = createAction(
    'Load cities success',
    props<{cities: City[]}>()
)