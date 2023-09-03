import { City } from "src/city/models/city.entity";
import { Role } from "src/enums/role.enum";

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

export interface UserUpdateDto{
    id: number;
    profilePicture: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: Role;
    cityId: number;
    JMBG: string;
    vehicle: string;
};