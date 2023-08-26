import { createAction, props } from "@ngrx/store";
import { Order, OrderDto } from "src/app/models/order";
import { ShoppingCart, ShoppingCartDto } from "src/app/models/shopping-cart";

export const addToCart = createAction(
    'Add to shopping cart',
    props<{order: ShoppingCartDto}>()
);

export const addToCartSuccess = createAction(
    'Add to shopping cart success',
    props<{order: ShoppingCart}>()
);

export const loadMyCart = createAction(
    'Load my shopping cart',
    props<{userId: number}>()
);

export const loadMyCartSuccess = createAction(
    'Load my shopping cart success',
    props<{shoppingCarts: ShoppingCart[]}>()
);

export const updateCount = createAction(
    'Update shopping cart count',
    props<{shoppingCart: ShoppingCart}>()
);

export const updateCountSuccess =createAction(
    'Update shopping cart count success',
    props<{shoppingCart: ShoppingCart}>()
);

export const deleteShoppingCart = createAction(
    'Delete shopping cart',
    props<{cartId: number}>()
);

export const deleteShoppingCartSuccess = createAction(
    'Delete shopping cart success',
    props<{cartId: number}>()
);

export const makeOrder = createAction(
    'Make order',
    props<{order: OrderDto, carts: ShoppingCart[]}>()
);

export const orderSuccess = createAction(
    'Make order success',
    props<{carts: ShoppingCart[]}>()
);