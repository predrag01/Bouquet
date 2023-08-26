import { BouquetType } from "src/bouquet-type/models/bouquet-type.entity";
import { Order } from "src/order/models/order.enity";
import { ShoppingCart } from "src/shopping-cart/models/shoppingCart.entity";
import { FloverShop } from "src/store/models/store.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bouquet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false })
    title: string;

    @Column({type: 'text', nullable: true })
    image: string;

    @Column({type: 'text', nullable: false })
    description: string;

    @Column({nullable: false })
    price: number;

    @ManyToOne(()=> BouquetType, (type:BouquetType) => type.bouquets, {onDelete: 'SET NULL'})
    bouquetType: BouquetType;

    @ManyToOne(() => FloverShop, (store: FloverShop) => store.bouquets, {onDelete: 'CASCADE'})
    store: FloverShop;

    @OneToMany(() => ShoppingCart, ( order: ShoppingCart) => order.bouquet)
    shoppingCarts: ShoppingCart[];

    @ManyToMany(() => Order, (order: Order) => order.bouquets)
    orders: Order[];
}