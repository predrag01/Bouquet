import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ShoppingCart } from "src/app/models/shopping-cart";
import * as CartActions from './shopping-cart.actions';

export interface ShoppingCartState extends EntityState<ShoppingCart> { };

const adapter = createEntityAdapter<ShoppingCart>();

export const initialState: ShoppingCartState = adapter.getInitialState();

export const shoppingCartReducer = createReducer(
    initialState,
    on(CartActions.addToCartSuccess, (state, { order }) => adapter.addOne(order, state)),
    on(CartActions.loadMyCartSuccess, (state, { shoppingCarts }) => adapter.addMany(shoppingCarts, state)),
    on(CartActions.updateCountSuccess, (state, { shoppingCart }) => adapter.updateOne({ id: shoppingCart.id, changes: shoppingCart}, state)),
    on(CartActions.deleteShoppingCartSuccess, (state, { cartId }) => adapter.removeOne(cartId, state)),
    on(CartActions.orderSuccess, (state, { carts }) => adapter.removeMany(carts.map(cart => cart.id), state))
)