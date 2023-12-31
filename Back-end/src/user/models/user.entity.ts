import { City } from "src/city/models/city.entity";
import { Role } from "src/enums/role.enum";
import { Order } from "src/order/models/order.enity";
import { ShoppingCart } from "src/shopping-cart/models/shoppingCart.entity";
import { FlowerShop } from "src/store/models/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', nullable: true})
    profilePicture: string;
    
    @Column({ type:'text', nullable: false})
    username: string;

    @Column({ type:'text', nullable: false})
    name: string;

    @Column({ type:'text', nullable: false})
    lastName: string;

    @Column({ type:'text', nullable: false})
    email: string;

    @Column({ type:'text', nullable: false})
    password: string;

    @Column({ type:'text', nullable: false})
    phone: string;

    @Column({ type:'text', nullable: false})
    address: string;

    @Column({ type: 'text', nullable: false, default: Role.User })
    role: Role;

    @ManyToOne(() => City, (city: City) => city.users, { onDelete: 'SET NULL'})
    city: City;

    @OneToMany(() => FlowerShop, (store: FlowerShop) => store.owner)
    stores: FlowerShop[]

    @ManyToOne(()=> FlowerShop, (store: FlowerShop) => store.employees, {onDelete: 'SET NULL'})
    employeed: FlowerShop;

    @OneToMany(() =>ShoppingCart, (shoppingCart: ShoppingCart) => shoppingCart.buyer)
    shoppingCarts: ShoppingCart[];

    @OneToMany(() => Order, (order: Order) => order.buyer)
    orders: Order[];

    @OneToMany(() => Order, (order: Order) => order.deliveryGuy)
    deliveredOrders: Order[];

    //for delivery guy
    @Column({ type:'text', nullable: true})
    JMBG: string;

    @Column({ type:'text', nullable: true})
    vehicle: string;
}