import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './../users/user';


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
    @Column({default: ""})
    created_at?: string;
    @Column({default: ""})
    updated_at: string;
}

