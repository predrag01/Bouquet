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