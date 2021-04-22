import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Company } from "./Company";
import { ProductCategory } from "./ProductCategory";
@Entity({name:"products"})
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:150})
    name:string;

    @Column({type:"varchar",length:150})
    description:string;

    @Column({type:"decimal"})
    price:number;

    @Column({ type: "varchar", nullable: true })
    categoryId: string;

    @Column({ type: "varchar", nullable: true })
    companyId: string;

    @ManyToOne(type => Company)
    @JoinColumn({ name: "companyId"})
    company: Company;

    @ManyToOne(type => ProductCategory)
    @JoinColumn({ name: "categoryId" })
    category: ProductCategory;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    updated_at : Date;
}

