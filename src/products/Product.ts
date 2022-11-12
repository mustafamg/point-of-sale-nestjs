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
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  barcode: string;
  @Column()
  low_stock: number;  
  @Column()
  optimal_stock: number;
  @Column()
  stock_type: stockType;
  @ManyToOne(()=>Category, (category)=> category.name)
  category : Category
  
}

