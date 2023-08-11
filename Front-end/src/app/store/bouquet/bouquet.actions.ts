import { createAction, props } from "@ngrx/store";
import { Bouquet, BouquetDto } from "src/app/models/bouquet";

export const addBouquet = createAction(
    'Add bouquet',
    props<{ bouquet: BouquetDto }>()
);
export const addBouquetSuccess = createAction(
    'Add bouquet success',
    props<{ bouquet: Bouquet }>()
);

export const loadBouquetListByStoreId = createAction(
    'Load bouquet list by store id',
    props<{ shopId: number }>()
);
export const loadBouquetListByStoreIdSuccess = createAction(
    'Load bouquet list by store id success',
    props<{ bouquets: Bouquet[] }>()
);

export const deleteBouquet = createAction(
    'Delete bouquet',
    props<{ bouquetId: number }>()
);

export const deleteBouquetSuccess = createAction(
    'Delete bouquet success',
    props<{ bouquetId: number }>()
);

export const selectBouquet = createAction(
    'Select bouquet',
    props<{ bouquetId: number }>()
);

export const deselectBouquet = createAction(
    'Deselect bouquet'
);

export const updateBouquet = createAction(
    'Update bouquet',
    props<{bouquet: Bouquet}>()
);
export const updateBouquetSuccess = createAction(
    'Update bouquet success',
    props<{bouquet: Bouquet}>()
)