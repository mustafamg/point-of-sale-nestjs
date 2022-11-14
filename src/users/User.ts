import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { userInfo } from "os";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shift } from "./shifts/Shift";

export enum UserRole {
    MANAGER = "Manager",
    ECONOMIST = "Economist",
    USER = "User",
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    @Column()
    email: string;

    @IsString()
    @MinLength(4)
    @Column({default : 123})
    password : string;

    @IsEnum(UserRole)	
    @Column({

        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @ManyToOne(() => Shift, (shift) => shift.name)
    @JoinColumn()
    shift: Shift;

}