import { Roles } from "../enums/role";
import { City } from "./city";

export interface User{
    id: number;
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: Roles;
    city: City;
};

export interface RegisterUser{
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: City
};

export interface LoginUser {
    user: User,
    accessToken: string
}