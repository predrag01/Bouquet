import { Order } from "src/order/models/order.enity";
import { FloverShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false})
    city: string;

    @OneToMany(() => User, (user: User) => user.city)
    users: User[];

    @OneToMany(() => FloverShop, (store: FloverShop) => store.city)
    stores: FloverShop[];

    @OneToMany(() => Order, ( order: Order) => order.city)
    orders: Order[]
}