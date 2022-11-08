import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from '../categories/Category';


export enum stockType {
    L = "l",
    Kg = "kg",
    Piese = "pcs",
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    name: string; 
    
    @Column()
    price: number;

    @Column({unique:true})
    barcode: string; 
   
    @ManyToOne(() => Category , (category) => category.name) //(user) => user.photos 
    category: Category

    @Column({
        type: "enum",
        enum: stockType,
    })
    stock_type: stockType

    @Column({default: 0})
    low_stock: number;

    @Column({default: 10})
    optimal_stock: number;     
}

