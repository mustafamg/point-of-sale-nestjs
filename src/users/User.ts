import { IsEmail, IsNotEmpty } from "class-validator";
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
    //@IsNotEmpty()
    @Column()
    name: string;
    //@IsNotEmpty()
    @Column()
    email: string;
    @Column({default : 123})
    password : string;
    @Column({

        type: "enum",
        enum: UserRole,
    })
    role: UserRole;

    @ManyToOne(() => Shift, (shift) => shift.name)
    @JoinColumn()
    shift: Shift;

}