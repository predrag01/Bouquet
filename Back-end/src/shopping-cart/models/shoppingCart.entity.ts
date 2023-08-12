import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { City } from "src/city/models/city.entity";
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
    
    @Column({type: 'text', nullable: true })
    message: string;

    @ManyToOne(() => City, ( city: City) => city.shoppingCarts, {onDelete: 'SET NULL'})
    city: City;
    
    @Column({type: 'text', nullable: false })
    address: string;
    
    @ManyToOne(() => User, (owner: User) => owner.shoppingCarts, {onDelete: 'CASCADE'})
    buyer: User;

}