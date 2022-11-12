import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shift } from './../shifts/Shift';
// import { Role } from "../authorization/RBAC/role.enum";
import { AppRoles } from "src/authorization/nest-access-control/app.roles";
// import { AppRoles } from "src/authorization/nest-access-control/app.roles";


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

    @IsOptional()
    @Column({
        type: "enum",
        enum: AppRoles,
        default: AppRoles.USER,
    })
    roles: AppRoles[]

    @IsOptional()
    @Column({default:null})
    photo: string | null;

    @IsOptional()
    @ManyToOne(() => Shift, (shift) => shift.name) //  
    @JoinColumn()
    shift: Shift 
    
    /*  // ---- Test Authurization with RBAC
   
    @IsOptional()
    @Column({
        type: "enum",
        enum: Role,
        default: Role.User,
    })
    roles: Role[] */
}

