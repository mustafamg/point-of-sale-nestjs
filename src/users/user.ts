import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shift } from './../shifts/Shift';


@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column()
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

    @IsNotEmpty()
    @IsString()
    @Column()
    role: string;

    @IsOptional()
    @Column({default:null})
    photo: string | null;

    @ManyToOne(() => Shift, (shift) => shift.name) //  
    @JoinColumn()
    shift: Shift  
}

// export interface User {
//     id?: number;
//     name: string;
//     email: string;
//     role: string;
//     userId: number;
//     photo: string | null;
  
//     user_shift: {
//       id: number;
//       user_id: number;
//       shift_id: number;
//       shift: {
//         id: number;
//         name: string;
//       };
//     } | null;
//   }
   