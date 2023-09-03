export interface FlowerShopDto {
    name: string;
    address: string;
    email: string;
    phone: string;
    picture: string;
    pib: string;
    monFri: string;
    saturday: string;
    sunday: string;
    cityId: number;
    ownerId: number;
}

export interface FlowerShopUpdateDto {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    picture: string;
    pib: string;
    monFri: string;
    saturday: string;
    sunday: string;
    cityId: number;
    ownerId: number;
}