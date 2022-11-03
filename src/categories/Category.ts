import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  icon: string;
  
  @Column({ default: "red" })
  color: string;
}
