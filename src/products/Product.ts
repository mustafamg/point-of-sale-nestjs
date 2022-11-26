import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity,  ManyToOne,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories/Category";

export enum stockType{
  L = "l",
  Kg = "kg",
  pieces = "pcs",
}

@Entity()
export class Product{
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  barcode: string;
  @Column()
  lowStock: number;  
  @Column()
  optimalStock: number;
  @Column()
  stockType: stockType;
  @ManyToOne(()=>Category, (category)=> category.name)
  category : Category  
}

