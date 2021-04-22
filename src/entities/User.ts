
import { Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:150})
    name: string;

    @Column({type:"varchar",length:150})
    surname: string;

    @Column({type:"varchar", length:150,unique:true})
    email: string;

    @Column({type:"varchar",length:150})
    @Length(6, 100)
    password: string;

    @Column({type:"bool", nullable:true})
    vefiried_email: boolean;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
        return;
      }
    
      verifyPassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    created_at : Date;

    @Column({type:"datetime",default:() => "CURRENT_TIMESTAMP"})
    updated_at : Date;

}