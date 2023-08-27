import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/models/order";
import * as OrderActions from './order.actions'

export interface OrderState extends EntityState<Order> { };

const adapter = createEntityAdapter<Order>();

export const initialState: OrderState = adapter.getInitialState();

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.loadFilteredOrdersSuccess, (state, { orders }) => {
        const newState = adapter.removeAll(state);
        return adapter.addMany(orders, newState)}),
    on(OrderActions.changeStatusToOrderSuccess, (state, { order }) => adapter.removeOne(order.id, state)),
    on(OrderActions.loadOrdersReadyToDeliverySuccess, (state, { orders }) => {
        const newState = adapter.removeAll(state);
        return adapter.addMany(orders, newState)}),
    on(OrderActions.loadOrdersFilteredByDeliveryGugSuccess, (state, { orders }) => {
        const newState = adapter.removeAll(state);
        return adapter.addMany(orders, newState)}),
    on(OrderActions.acceptForDeliverySuccess, (state, { order }) => adapter.removeOne(order.id, state)),
)