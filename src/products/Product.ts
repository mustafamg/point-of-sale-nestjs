import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber } from "class-validator";
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

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  price: number;

  @IsNotEmpty()
  @Column()
  barcode: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  low_stock: number; 

  @IsNumber()
  @IsNotEmpty()
  @Column()
  optimal_stock: number;

  @IsEnum(stockType)
  @IsNotEmpty()
  @Column()
  stock_type: stockType;

  @IsNotEmpty()
  @ManyToOne(()=>Category, (category)=> category.name)
  category : Category
  
}

