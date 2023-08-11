import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Bouquet } from "src/app/models/bouquet";

export const selectBouquetFeature = createSelector(
    (state: AppState) => state.bouquet,
    (bouquet) => bouquet
);

export const loadBouquetList = createSelector(
    selectBouquetFeature,
    (bouquet) => bouquet.ids
    .map( id => bouquet.entities[id])
    .filter( bouqet => bouqet !== null)
    .map( bouquet => <Bouquet>bouquet)
);