import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../User";

@Entity()
export class Shift {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    start_time: string;
    @Column()
    end_time: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at?: Date;

  }