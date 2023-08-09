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