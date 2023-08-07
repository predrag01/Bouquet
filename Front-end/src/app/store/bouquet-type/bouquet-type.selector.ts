import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { BouquetType } from "src/app/models/bouquet-type";

export const selectTypefeature = createSelector(
    (state: AppState) => state.types,
    (types) => types
);

export const loadTypeList = createSelector(
    selectTypefeature,
    (types) => types.ids
    .map( id => types.entities[id])
    .filter( type => type !== null)
    .map((type) => <BouquetType>type)
);

export const selectTypeId = createSelector(
    selectTypefeature,
    (types) => types.selectedCity
);

export const selectType= createSelector(
    selectTypefeature,
    selectTypeId,
    (state, typeId) => state.entities[typeId]
);