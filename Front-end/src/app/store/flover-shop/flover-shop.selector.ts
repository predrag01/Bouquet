import { createSelector } from "@ngrx/store";
import { map } from "rxjs";
import { AppState } from "src/app/app.state";
import { FloverShop } from "src/app/models/store";

export const selectShopFeature = createSelector(
    (state: AppState) => state.shop,
    (shops) => shops
);

export const loadMyStores = createSelector(
    selectShopFeature,
    (shops) => shops.ids
    .map(id => shops.entities[id])
    .filter(shop => shop !== null)
    .map(shop => <FloverShop>shop)
);

export const selectStoreId = createSelector(
    selectShopFeature,
    (shops) => shops.selectedStore
);

export const selectStore = createSelector(
    selectShopFeature,
    selectStoreId,
    (shops, storeId) => shops.entities[storeId]
);