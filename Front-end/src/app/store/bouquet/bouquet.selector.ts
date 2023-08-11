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

export const selecetBouquetId = createSelector(
    selectBouquetFeature,
    (bouquet) => bouquet.selectedBouquet
);

export const selectBouquet = createSelector(
    selectBouquetFeature,
    selecetBouquetId,
    (state, bouquetId) => state.entities[bouquetId]
);