import { BouquetTypeState } from "./store/bouquet-type/bouquet-type.reducer";
import { CityState } from "./store/city/city.reducer";
import { FloverShopState } from "./store/flover-shop/flover-shop.reducer";
import { UserState } from "./store/user/user.reducer";


export interface AppState {
    user: UserState;
    cities: CityState;
    types: BouquetTypeState;
    shop: FloverShopState;
}