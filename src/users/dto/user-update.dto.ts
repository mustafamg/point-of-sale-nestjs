import { IsEmail, IsOptional, IsString } from "class-validator";
import { Shift } from "src/shifts/Shift";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Role } from "../../authorization/RBAC/role.enum";
import { AppRoles } from 'src/authorization/nest-access-control/app.roles';

export class UserUpdate {
    @IsString()
    @IsOptional()
    @Column({default: "demo user"})
    name: string;
 
    @IsEmail()
    @IsOptional()
    @IsString()
    @Column({unique: true})  
    email: string;

    @IsOptional()
    @IsString()
    @Column()
    password:string

    // @IsString()
    @IsOptional()
    @Column({default: "user"})
    roles: AppRoles[]

    @IsOptional()
    @Column({default:null})
    photo: string | null;

    @IsOptional()
    @ManyToOne(() => Shift, (shift) => shift.name) //  
    @JoinColumn()
    shift: Shift  
}

