import { Status } from "../enums/status";
import { Bouquet } from "./bouquet";
import { City } from "./city";
import { FloverShop } from "./store";
import { User } from "./user";

export interface Order {
    id: number;
    bouquet: Bouquet;
    totalPrice: number;
    message: string;
    city: City;
    address: string;
    dateToDelivery: Date;
    dateOfOrder: Date;
    status: Status;
    buyer: User;
    deliveryGuy: User;
}

export interface OrderDto {
    bouquets: Bouquet[];
    totalPrice: number;
    message: string | null;
    city: City;
    address: string;
    dateToDelivery: Date | null;
    dateOfOrder: Date;
    status: Status;
    buyer: User;
}