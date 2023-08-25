import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { FloverShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";

export interface ShoppingCartDto {
    bouquet: Bouquet;
    count: number;
    buyer: User | null;
    shop: FloverShop | null;
}