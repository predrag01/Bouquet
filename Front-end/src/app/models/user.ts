import { Roles } from "../enums/role";

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
}