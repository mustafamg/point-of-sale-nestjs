import { IsDate, isDate, IsMilitaryTime, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../User";

@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsMilitaryTime()	
    @IsNotEmpty()
    @Column()
    start_time: string;

    @IsMilitaryTime()	
    @IsNotEmpty()
    @Column()
    end_time: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at?: Date;

  }