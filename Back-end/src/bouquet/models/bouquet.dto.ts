export interface BouquetDto {
    title: string;
    image: string;
    description: string;
    price: number;
    typeId: number | null;
    storeId: number | null;
}

export interface BouquetUpdateDto {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    typeId: number | null;
}