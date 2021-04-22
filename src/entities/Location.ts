
import {Entity, PrimaryGeneratedColumn,OneToMany ,ManyToOne,Column} from "typeorm";
import { Company } from "./Company";

@Entity({name:"locations"})

export class Location {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({type:"varchar",length:150,unique:true})
    name : string;

    @OneToMany(() => Company , company => company.location)
    company : Company[];

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    updated_at : Date;
}