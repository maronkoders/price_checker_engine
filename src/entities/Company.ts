
import {Entity, PrimaryGeneratedColumn ,Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Location } from "./Location";
import { Product } from "./Product";

@Entity({name:"companies"})

export class Company {

    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column({type:"varchar",length:150})
    name: string;

    @Column({ type: "varchar", nullable: true })
    locationId: string;

    @ManyToOne(type => Location)
    @JoinColumn({ name: "locationId"})
    location: Location;

    @OneToMany(() => Product, product => product.company)
    product: Product[];

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    updated_at : Date;
}