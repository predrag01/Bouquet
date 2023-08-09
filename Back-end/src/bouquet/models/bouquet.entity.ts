import { BouquetType } from "src/bouquet-type/models/bouquet-type.entity";
import { FloverShop } from "src/store/models/store.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}