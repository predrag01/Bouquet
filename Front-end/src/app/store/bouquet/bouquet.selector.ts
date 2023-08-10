import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";

export const selectBouquetFeature = createSelector(
    (state: AppState) => state.bouquet,
    (bouquet) => bouquet
);