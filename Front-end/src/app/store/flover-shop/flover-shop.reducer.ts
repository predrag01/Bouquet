import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { FloverShop } from "src/app/models/store";
import * as Actions from './flover-shop.actions'

export interface FloverShopState extends EntityState<FloverShop> {
     selectedStore: number
     oneShop: FloverShop | null
};

const adapter = createEntityAdapter<FloverShop>();

export const initialState: FloverShopState = adapter.getInitialState({
    selectedStore: 0,
    oneShop: null
});

export const shopReducer = createReducer(
    initialState,
    on(Actions.createShopSuccess, ( state, { shop }) => adapter.addOne(shop, state)),
    on(Actions.loadMyStoreListSuccess, (state, {shops}) => adapter.addMany(shops, state)),
    on(Actions.deleteStoreSuccess, (state , { id }) => adapter.removeOne(id, state)),
    on(Actions.selectStore, (state, { id }) => ({ ...state, selectedStore:id })),
    on(Actions.deselectStore, ( state ) => ({...state, selectedStore:0 })),
    on(Actions.updateShopSuccess, (state, { shop} ) => adapter.updateOne({id: shop.id, changes: shop}, state)),
    on(Actions.loadOneStoreSuccess, (state, { shop })=> ({...state, oneShop: shop})),
);