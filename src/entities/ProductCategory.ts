
import { isNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, OneToMany} from "typeorm";

import { Product } from "./Product";
@Entity({name:"product_categories"})
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column({type:"varchar",length:150,unique:true})
    name: string;

    @OneToMany(() => Product,product=>product.category)
    product: Product[];

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    updated_at : Date;
}