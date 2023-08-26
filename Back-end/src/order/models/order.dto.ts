import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { City } from "src/city/models/city.entity";
import { Status } from "src/enums/status.enum";
import { FloverShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";

export interface OrderDto {
    bouquet: Bouquet;
    count: number;
    totalPrice: number;
    message: string;
    city: City;
    address: string;
    dateToDelivery: Date;
    dateOfOrder: Date;
    status: Status;
    buyer: User;
    shop: FloverShop;
}