import { createAction, props } from "@ngrx/store";
import { BouquetType } from "src/app/models/bouquet-type";

export const addtype = createAction(
    'Add type',
    props<{bouquetType: string}>()
);

export const addTypeSuccess = createAction(
    'Add type success',
    props<{bouquetType: BouquetType}>()
);

export const loadTypes= createAction('Load bouquet type list');
export const loadTypeListSuccess= createAction(
    'Load bouquet type list sueccess',
    props<{types: BouquetType[]}>()
);

export const deleteType= createAction(
    'Delete bouquet type',
    props<{id: number}>()
);

export const deleteTypeSuccess= createAction(
    'Delete bouquet type success',
    props<{id: number}>()
);

export const selectType = createAction(
    'Select bouquet type',
    props<{id: number}>()
);

export const deselectType = createAction('Deselect bouquet type');

export const updateType = createAction(
    'Update bouquet type',
    props<{bouquetType: BouquetType}>()
);

export const updateTypeSuccess = createAction(
    'Update bouquet type success',
    props<{id: number, name: string}>()
);