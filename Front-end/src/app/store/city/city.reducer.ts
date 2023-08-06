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
    on(Actions.loadCitiesSuccess, (state, { cities }) => adapter.setAll(cities, state)),
    on(Actions.addCitySuccessfully, (state, { city }) => adapter.addOne(city, state)),
    on(Actions.deleteCitySuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(Actions.selectCity, (state, { id }) => ({ ...state, selectedCity:id })),
    on(Actions.deselectCity, (state) => ({ ...state, selectedCity:0 })),
    on(Actions.updateCitySuccess, (state, { id, name }) => adapter.updateOne({
        id: id,
        changes: {
            city: name
        },
    },
    state
    ))
);