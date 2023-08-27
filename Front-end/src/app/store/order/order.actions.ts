import { createAction, props } from "@ngrx/store";
import { Status } from "src/app/enums/status";
import { Order } from "src/app/models/order";

export const loadFilteredOrders = createAction(
    'Load filtered orders',
    props<{shopId: number, filter: Status}>()
);

export const loadFilteredOrdersSuccess = createAction(
    'Load filtered orders success',
    props<{orders: Order[]}>()
);

export const changeStatusToOrder = createAction(
    'Change status to order',
    props<{orderId: number, status: Status}>()
);

export const changeStatusToOrderSuccess = createAction(
    'Change status to order orders',
    props<{order: Order}>()
);

// export const loadReadyToDeliveryOrders = createAction(
//     'Change status to order orders',
//     props<{shopId: number}>()
// );

// export const loadReadyToDeliveryOrdersSuccess = createAction(
//     'Load ready to delivery orders success',
//     props<{orders: Order[]}>()
// );

// export const loadDeliveredOrders = createAction(
//     'Load delivered orders',
//     props<{shopId: number}>()
// );

// export const loadDeliveredOrdersSuccess = createAction(
//     'Load delivered orders success',
//     props<{orders: Order[]}>()
// );