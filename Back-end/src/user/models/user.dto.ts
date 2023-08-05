import { City } from "src/city/models/city.entity";

export class UserDto {
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: City;
}