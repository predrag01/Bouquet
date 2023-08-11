import { BouquetType } from "./bouquet-type";
import { FloverShop } from "./store";

export interface Bouquet {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    bouquetType: BouquetType;
    store: FloverShop;
}

export interface BouquetDto {
    title: string;
    image: string;
    description: string;
    price: number;
    typeId: number | null;
    storeId: number | null;
}