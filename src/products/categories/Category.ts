import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column()
  name: string;
  @IsNotEmpty()
  @Column()
  icon: string;
  @Column()
  color: string;
}
