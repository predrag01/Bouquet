import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { FloverShop } from "src/store/models/store.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Bouquet, ( order: Bouquet) => order, {onDelete: 'CASCADE'})
    bouquet: Bouquet;

    @Column({nullable: false })
    count: number;
    
    @ManyToOne(() => User, (owner: User) => owner.shoppingCarts, {onDelete: 'CASCADE'})
    buyer: User;

    @ManyToOne(() => FloverShop, (shop: FloverShop) => shop.shoppingCarts, {onDelete: 'CASCADE'})
    shop: FloverShop;
}