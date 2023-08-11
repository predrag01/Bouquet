import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Bouquet } from "src/app/models/bouquet";
import * as BouquetActions from './bouquet.actions';

export interface BouquetState extends EntityState<Bouquet> {};

const adapter = createEntityAdapter<Bouquet>();

export const initialSate: BouquetState = adapter.getInitialState();

export const bouquetReducer = createReducer(
    initialSate,
    on(BouquetActions.addBouquetSuccess, (state, { bouquet }) => adapter.addOne(bouquet, state)),
    on(BouquetActions.loadBouquetListByStoreIdSuccess, (state , { bouquets }) => adapter.addMany(bouquets, state)),
    on(BouquetActions.deleteBouquetSuccess, (state, { bouquetId }) => adapter.removeOne(bouquetId, state)),
);