import { createAction, props } from "@ngrx/store";
import { FloverShop, FloverShopDto } from "src/app/models/store";

export const createShop = createAction(
    'Create flover shop',
    props<{formData: FloverShopDto}>()
);
export const createShopSuccess = createAction(
    'Create flover shop success',
    props<{shop: FloverShop}>()
);

export const loadMyStoreList = createAction(
    'Load list of my stores',
    props<{id: number}>()
);

export const loadMyStoreListSuccess = createAction(
    'Load list of my stores success',
    props<{shops: FloverShop[]}>()
);

export const deleteStore = createAction(
    'Delete store',
    props<{id: number}>()
);

export const deleteStoreSuccess = createAction(
    'Delete store success',
    props<{id: number}>()
);

export const selectStore = createAction(
    'Select flover shop',
    props<{id: number}>()
);

export const deselectStore = createAction(
    'Deselect flover shop',
);

export const updateShop = createAction(
    'Update flover shop',
    props<{ shop: FloverShop}>()
);

export const updateShopSuccess = createAction(
    'Update flover shop success',
    props<{ shop: FloverShop}>()
); 