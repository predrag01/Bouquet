import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { FloverShop } from "src/app/models/store";
import * as Actions from './flover-shop.actions'

export interface FloverShopState extends EntityState<FloverShop> {
     
};

const adapter = createEntityAdapter<FloverShop>();

export const initialState: FloverShopState = adapter.getInitialState();

export const shopReducer = createReducer(
    initialState,
    on(Actions.createShopSuccess, ( state, { shop }) => adapter.addOne(shop, state)),
    on(Actions.loadMyStoreListSuccess, (state, {shops}) => adapter.addMany(shops, state)),
);