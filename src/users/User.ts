import { IsEmail, IsNotEmpty } from "class-validator";
import { userInfo } from "os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    //@IsNotEmpty()
    @Column()
    username: string;
    //@IsNotEmpty()
    @Column()
    email: string;
    @Column()
    password : string;
    @Column({

        type: "enum",
        enum: UserRole,
    })
    role: UserRole;

    @ManyToMany(() => Shift)
    @JoinTable()
    shifts: Shift[]

}