import { createAction, props } from "@ngrx/store";
import { City } from "src/app/models/city";
import { FloverShop, FloverShopDto } from "src/app/models/store";

export const createShop = createAction(
    'Create flover shop',
    props<{formData: FormData}>()
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
    props<{ shop: FormData}>()
);

export const updateShopSuccess = createAction(
    'Update flover shop success',
    props<{ shop: FloverShop}>()
); 

export const loadOneStore = createAction(
    'Load one flover shop',
    props<{id: number}>()
);

export const loadOneStoreSuccess = createAction(
    'Load one flover shop success',
    props<{ shop: FloverShop}>()
); 

export const addEmployee = createAction(
    'Add employee',
    props<{email: string, shopId: number }>()
);

export const addEmployeeSuccess = createAction(
    'Add employee success',
    props<{shop: FloverShop}>()
);

export const removeEmployee = createAction(
    'Remove employee',
    props<{userId: number, shopId: number }>()
);

export const removeEmployeeSuccess = createAction(
    'Add employee success',
    props<{shop: FloverShop}>()
);

export const loadFloverShopForHome = createAction(
    'Load flover shop for home page',
    props<{cityId: number}>()
);

export const loadFloverShopForHomeSuccess = createAction(
    'Load flover shop for home page success',
    props<{floverStores: FloverShop[]}>()
);

export const loadAllStores = createAction(
    'Load all flower shop',
);

export const loadAllStoresSuccess = createAction(
    'Load all flower shop success',
    props<{stores: FloverShop[]}>()
);

export const loadEmployeeStore = createAction(
    'Load employee store',
    props<{id: number}>()
);

export const loadEmployeeStoreSuccess = createAction(
    'Load employee store success',
    props<{store: FloverShop}>()
);
