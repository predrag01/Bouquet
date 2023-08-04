import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { City } from "src/city/models/city.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    address: string;

    @Column({type: 'text', nullable: false})
    email: string;

    @Column({type: 'text', nullable: false})
    phone: string;

    @Column({type: 'text', nullable: true})
    picture: string;
    
    @Column({type: 'text', nullable: false})
    pib: string;

    @ManyToOne(() => City, (city: City) => city.stores, {onDelete: 'SET NULL'})
    city: City;

    @ManyToOne(() => User, (user: User) => user.stores, {onDelete: 'CASCADE'})
    owner: User;

    @OneToMany(() => User, (user: User) => user.employeed)
    employees: User[];

    @OneToMany(() => Bouquet, (bouquet: Bouquet) => bouquet.store)
    bouquets: Bouquet[];
}