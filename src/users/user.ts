import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shift } from './../shifts/Shift';


@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @IsString()
    @Column({default: "demo user"})
    name: string;
 
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Column({unique: true})  
    email: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    password:string

    @IsString()
    @Column({default: "user"})
    role: string;

    @IsOptional()
    @Column({default:null})
    photo: string | null;

    @IsOptional()
    @ManyToOne(() => Shift, (shift) => shift.name) //  
    @JoinColumn()
    shift: Shift  
}

