import { BouquetTypeState } from "./store/bouquet-type/bouquet-type.reducer";
import { BouquetState } from "./store/bouquet/bouquet.reducer";
import { CityState } from "./store/city/city.reducer";
import { FloverShopState } from "./store/flover-shop/flover-shop.reducer";
import { ShoppingCartState } from "./store/shopping-cart/shopping-cart.reducer";
import { UserState } from "./store/user/user.reducer";


export interface AppState {
    user: UserState;
    cities: CityState;
    types: BouquetTypeState;
    shop: FloverShopState;
    bouquet: BouquetState;
    shoppingCart: ShoppingCartState;
}