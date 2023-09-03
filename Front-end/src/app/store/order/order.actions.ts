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
    props<{order: number}>()
);

export const loadOrdersReadyToDelivery = createAction(
    'Load orders ready to delivery',
    props<{cityId: number}>()
);

export const loadOrdersReadyToDeliverySuccess = createAction(
    'Load orders ready to delivery success',
    props<{orders: Order[]}>()
);

export const loadOrdersFilteredByDeliveryGug = createAction(
    'Load orders filtered by delivery guy',
    props<{deliveryGuyId: number, status: Status}>()
);

export const loadOrdersFilteredByDeliveryGugSuccess = createAction(
    'Load orders filtered by delivery guy success',
    props<{orders: Order[]}>()
);

export const acceptForDelivery = createAction(
    'Change status on order to accept for delivery',
    props<{orderId: number, deliveryGuyId: number}>()
);

export const acceptForDeliverySuccess = createAction(
    'Change status on order to accept for delivery orders',
    props<{orderId: number}>()
);