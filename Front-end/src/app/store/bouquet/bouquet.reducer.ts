import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Bouquet } from "src/app/models/bouquet";
import * as BouquetActions from './bouquet.actions';

export interface BouquetState extends EntityState<Bouquet> {
    selectedBouquet: number;
};

const adapter = createEntityAdapter<Bouquet>();

export const initialSate: BouquetState = adapter.getInitialState({
    selectedBouquet: 0
});

export const bouquetReducer = createReducer(
    initialSate,
    on(BouquetActions.addBouquetSuccess, (state, { bouquet }) => adapter.addOne(bouquet, state)),
    on(BouquetActions.loadBouquetListByStoreIdSuccess, (state , { bouquets }) => {
        const newState= adapter.removeAll(state);
        return adapter.addMany(bouquets, newState)
    }),
    on(BouquetActions.deleteBouquetSuccess, (state, { bouquetId }) => adapter.removeOne(bouquetId, state)),
    on(BouquetActions.selectBouquet, ( state, { bouquetId }) => ({ ...state, selectedBouquet: bouquetId})),
    on(BouquetActions.deselectBouquet, ( state ) => ({...state, selectedBouquet:0})),
    on(BouquetActions.updateBouquetSuccess, (state, { bouquet }) => adapter.updateOne({ id: bouquet.id, changes: bouquet }, state)),
);