import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { City } from "src/city/models/city.entity";
import { Status } from "src/enums/status.enum";
import { FloverShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bouquet, ( order: Bouquet) => order, {onDelete: 'CASCADE'})
    bouquet: Bouquet;

    @Column({nullable: false })
    count: number;

    @Column({nullable: false })
    totalPrice: number;
    
    @Column({type: 'text', nullable: true })
    message: string;

    @ManyToOne(() => City, ( city: City) => city.orders, {onDelete: 'SET NULL'})
    city: City;
    
    @Column({type: 'text', nullable: false })
    address: string;

    @Column({type: 'text', nullable: false })
    dateToDelivery: Date;

    @Column({type: 'text', nullable: false })
    dateOfOrder: Date;

    @Column({type: 'text', nullable: false })
    status: Status;
    
    @ManyToOne(() => User, (owner: User) => owner.orders, {onDelete: 'CASCADE'})
    buyer: User;

    @ManyToOne(() => User, (user: User) => user.deliveredOrders, {onDelete: "SET NULL"})
    deliveryGuy: User;
    
    @ManyToOne(() => FloverShop, (shop: FloverShop) => shop.orders, {onDelete: 'SET NULL'})
    shop: FloverShop;
}