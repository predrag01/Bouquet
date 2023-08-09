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