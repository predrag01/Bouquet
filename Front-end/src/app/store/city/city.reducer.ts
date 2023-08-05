import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { City } from "src/app/models/city";
import * as Actions from './city.actions'

export interface CityState extends EntityState<City> {
    selectedCity: number;
};

const adapter = createEntityAdapter<City>();

export const initialSate: CityState = adapter.getInitialState({
    selectedCity: 0,
});

export const cityReducer = createReducer(
    initialSate,
    on(Actions.loadCitiesSuccess, (state, {cities}) => adapter.setAll(cities, state)),
);