import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { ShoppingCart } from "src/app/models/shopping-cart";

export const selectShoppingCartFeature = createSelector(
    (state: AppState) => state.shoppingCart,
    (shoppingCart) => shoppingCart
);

export const loadShoppingCart =  createSelector(
    selectShoppingCartFeature,
    (shoppingCart) => shoppingCart.ids
    .map(id => shoppingCart.entities[id])
    .filter(shoppingCart => shoppingCart != null)
    .map((shoppingCart) => <ShoppingCart>shoppingCart)
);