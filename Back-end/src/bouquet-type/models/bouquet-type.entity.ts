import { Bouquet } from "src/bouquet/models/bouquet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BouquetType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false})
    type: string;

    @OneToMany(() => Bouquet, (bouquet: Bouquet) => bouquet.bouquetType)
    bouquets: Bouquet[]
}