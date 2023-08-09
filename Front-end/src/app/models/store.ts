import { City } from "./city";
import { User } from "./user";

export interface FloverShop {
    id: number;
    name: string;
    city: City;
    address: string;
    email: string;
    phone: string;
    picture: string;
    pib: string;
    monFir: string;
    saturady: string;
    sunday: string;
    owner: User;
}

export interface FloverShopDto {
    name: string | null;
    address: string | null;
    email: string | null;
    phone: string | null;
    picture: string | null;
    pib: string | null;
    monFri: string | null;
    saturday: string | null;
    sunday: string | null;
    cityId: number | null;
    ownerId: number | null;
}