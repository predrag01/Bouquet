import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { City } from "src/app/models/city";

export const selectCityFeature = createSelector(
    (state: AppState) => state.cities,
    (cities) => cities
);

export const loadCityList = createSelector(
    selectCityFeature,
    (cities) => cities.ids
    .map( id => cities.entities[id])
    .filter(city => city !== null)
    .map((city) => <City>city)
)