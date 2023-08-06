import { createAction, props } from "@ngrx/store";
import { City, CityDto } from "src/app/models/city";

export const loadCities = createAction ('Load cities');
export const loadCitiesSuccess = createAction(
    'Load cities success',
    props<{cities: City[]}>()
);

export const addCity = createAction(
    'Add city',
    props<{city: string}>()
);

export const addCitySuccessfully = createAction( 
    'Add city successfully',
    props<{city: City}>()
);

export const deleteCity = createAction(
    'Delete city',
    props<{id: number}>()
);

export const deleteCitySuccess =createAction(
    'Delete city success',
    props<{id: number}>()
);

export const selectCity = createAction(
    'Select city',
    props<{id: number}>()
);

export const deselectCity = createAction('Deselect city');

export const updateCity =createAction(
    'Update city',
    props<{city: City}>()
);

export const updateCitySuccess =createAction(
    'Update city success',
    // props<{id: number}>()
);



