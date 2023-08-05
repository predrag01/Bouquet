import { CityState } from "./store/city/city.reducer";
import { UserState } from "./store/user/user.reducer";


export interface AppState {
    user: UserState;
    cities: CityState;
}