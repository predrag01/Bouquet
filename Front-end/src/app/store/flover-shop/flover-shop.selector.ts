import { createSelector } from "@ngrx/store";
import { map } from "rxjs";
import { AppState } from "src/app/app.state";
import { FloverShop } from "src/app/models/store";

export const selectShopFeature = createSelector(
    (state: AppState) => state.shop,
    (shops) => shops
);

export const selcetShopOwner =createSelector(
    (state: AppState) => state.user,
    (user) => user
);

export const loadMyStores = createSelector(
    selectShopFeature,
    selcetShopOwner,
    (shops, user) => shops.ids
    .map(id => shops.entities[id])
    .filter(shop => shop !== null)
    .filter(shop => shop?.owner.id === user.user?.id)
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

export const loadAllShopByCity = createSelector(
    selectShopFeature,
    (stores) => stores.ids
    .map(id => stores.entities[id])
    .filter(shop => shop!==null)
    .map(store => <FloverShop>store)
);