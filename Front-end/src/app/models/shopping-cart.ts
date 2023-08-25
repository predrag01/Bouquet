import { Bouquet } from "./bouquet";
import { FloverShop } from "./store";
import { User } from "./user";

export interface ShoppingCart {
    id: number;
    bouquet: Bouquet;
    count: number;
    buyer: User;
    shop: FloverShop;
}

export interface ShoppingCartDto {
    bouquet: Bouquet;
    count: number;
    buyer: User | null;
    shop: FloverShop | null;
}