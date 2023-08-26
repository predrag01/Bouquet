import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Order } from "src/app/models/order";

export const selectOrderFeature = createSelector(
    (state: AppState) => state.order,
    (order) => order
);

export const loadOrders = createSelector(
    selectOrderFeature,
    (order) => order.ids
    .map(id => order.entities[id])
    .filter(order => order != null)
    .map((order) => <Order>order)
);