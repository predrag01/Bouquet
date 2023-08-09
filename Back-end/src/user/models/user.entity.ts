import { City } from "src/city/models/city.entity";
import { Role } from "src/enums/role.enum";
import { FloverShop } from "src/store/models/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
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
    public role: Role;

    @ManyToOne(() => City, (city: City) => city.users, { onDelete: 'SET NULL'})
    city: City;

    @OneToMany(() => FloverShop, (store: FloverShop) => store.owner)
    stores: FloverShop[]

    @ManyToOne(()=> FloverShop, (store: FloverShop) => store.employees, {onDelete: 'SET NULL'})
    employeed: FloverShop;
}