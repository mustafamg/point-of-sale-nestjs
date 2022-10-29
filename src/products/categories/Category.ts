import { isNotEmpty, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

