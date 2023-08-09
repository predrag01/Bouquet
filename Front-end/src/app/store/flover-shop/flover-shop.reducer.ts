import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer } from "@ngrx/store";
import { FloverShop } from "src/app/models/store";

export interface FloverShopState extends EntityState<FloverShop> {
     
};

const adapter = createEntityAdapter<FloverShop>();

export const initialState: FloverShopState = adapter.getInitialState();

export const shopReducer = createReducer(
    initialState,
);